import "server-only";
import { getRazorpayInstance } from "../utils/razorpay";
import { getOrderByNumber } from "./orderService";
import Order from "../models/Order";

/**
 * Converts Rupees to integer Paise to prevent floating point errors
 */
export const convertRupeesToPaise = (rupees) => {
  return Math.round(rupees * 100);
};

/**
 * Builds a safe receipt string for Razorpay
 */
export const buildRazorpayReceipt = (orderNumber) => {
  // Razorpay receipt length limit is 40 characters
  const receipt = `rcpt_${orderNumber}`;
  return receipt.substring(0, 40);
};

/**
 * Resolves a cafe order and creates a corresponding Razorpay order
 * Returns safe details needed by the frontend checkout
 */
export const createRazorpayOrderForCafeOrder = async (orderNumber, authenticatedUser = null, guestToken = null) => {
  // 1. Fetch the internal cafe order, validating access (throws if not authorized)
  const order = await getOrderByNumber(orderNumber, authenticatedUser, guestToken);

  if (!order) {
    throw new Error("Order not found");
  }

  // 2. Validate payment method
  if (order.paymentMethod !== "online") {
    throw new Error(`Order payment method is ${order.paymentMethod}, not online.`);
  }

  // 3. Validate payment status and handle duplicate clicks / idempotency
  if (order.paymentStatus === "paid") {
    throw new Error("Order is already paid.");
  }
  
  if (order.orderStatus === "cancelled") {
    throw new Error("Cannot pay for a cancelled order.");
  }

  const amountInPaise = convertRupeesToPaise(order.pricing.total);

  // Idempotency: Reuse existing Razorpay order if amount matches and it's still unpaid
  if (order.razorpay && order.razorpay.orderId) {
    if (order.razorpay.amount === amountInPaise) {
      return {
        razorpayOrderId: order.razorpay.orderId,
        internalOrderNumber: order.orderNumber,
        amount: amountInPaise,
        currency: "INR",
        keyId: process.env.RAZORPAY_KEY_ID, // Safe to expose
      };
    } else {
      // Amount mismatch (e.g. order was modified). We should ideally create a new one, 
      // but modifying a placed order is usually not allowed. We'll proceed to create a new one to be safe.
      console.warn(`Amount mismatch for order ${orderNumber}. Creating new Razorpay order.`);
    }
  }

  // 4. Create new Razorpay order
  const razorpay = getRazorpayInstance();
  const receipt = buildRazorpayReceipt(order.orderNumber);

  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: receipt,
    notes: {
      internalOrderNumber: order.orderNumber,
      internalOrderId: order._id.toString(),
      orderType: order.orderType,
    },
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);

    // 5. Link Razorpay order ID to the internal cafe order
    await Order.findByIdAndUpdate(order._id, {
      $set: {
        "razorpay.orderId": razorpayOrder.id,
        "razorpay.amount": amountInPaise,
        "razorpay.currency": "INR",
        "razorpay.status": razorpayOrder.status,
        "razorpay.createdAt": new Date(razorpayOrder.created_at * 1000)
      }
    });

    // 6. Return safe checkout data
    return {
      razorpayOrderId: razorpayOrder.id,
      internalOrderNumber: order.orderNumber,
      amount: amountInPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    };
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    throw new Error("Unable to create payment order with the payment provider.");
  }
};

/**
 * Verifies the Razorpay payment signature, fetches payment from Razorpay API, 
 * and atomically updates the order to paid.
 */
export const verifyAndCompleteRazorpayPayment = async (data, authenticatedUser = null, guestToken = null) => {
  const { internalOrderNumber, razorpayPaymentId, razorpayOrderId, razorpaySignature } = data;
  
  // 1. Fetch the internal cafe order, validating access
  const order = await getOrderByNumber(internalOrderNumber, authenticatedUser, guestToken);

  if (!order) {
    throw new Error("Order not found");
  }

  // 2. Validate payment method
  if (order.paymentMethod !== "online") {
    throw new Error("Order payment method is not online.");
  }

  // 3. Handle Idempotency
  if (order.paymentStatus === "paid") {
    if (order.razorpay && order.razorpay.paymentId === razorpayPaymentId) {
      // Already verified this exact payment successfully. Return success safely.
      return { orderNumber: order.orderNumber, paymentStatus: order.paymentStatus, orderStatus: order.orderStatus, pricing: order.pricing };
    }
    throw new Error("Order is already paid with a different transaction.");
  }

  if (order.orderStatus === "cancelled") {
    throw new Error("Cannot verify payment for a cancelled order.");
  }

  // 4. Verify stored order ID matches supplied order ID
  const storedOrderId = order.razorpay?.orderId;
  if (!storedOrderId || storedOrderId !== razorpayOrderId) {
    throw new Error("Order ID mismatch. Payment cannot be verified.");
  }

  // 5. Verify the HMAC Signature
  const { verifyRazorpaySignature } = await import("../utils/verifyRazorpaySignature");
  const isValidSignature = verifyRazorpaySignature(storedOrderId, razorpayPaymentId, razorpaySignature);

  if (!isValidSignature) {
    throw new Error("Invalid payment signature. Verification failed.");
  }

  // 6. Fetch actual payment from Razorpay to ensure amount and status
  const razorpay = getRazorpayInstance();
  let payment;
  try {
    payment = await razorpay.payments.fetch(razorpayPaymentId);
  } catch (err) {
    console.error("Failed to fetch Razorpay payment:", err);
    throw new Error("Unable to fetch payment details from Razorpay. Please try again.");
  }

  // 7. Verify Amount and Currency
  const expectedAmountInPaise = convertRupeesToPaise(order.pricing.total);
  if (payment.amount !== expectedAmountInPaise) {
    console.error(`Amount mismatch for ${order.orderNumber}. Expected ${expectedAmountInPaise}, got ${payment.amount}`);
    throw new Error("Payment amount mismatch.");
  }

  if (payment.currency !== "INR") {
    throw new Error("Payment currency mismatch.");
  }

  // 8. Verify Captured Status
  if (payment.status !== "captured") {
    throw new Error(`Payment is not fully captured. Current status is ${payment.status}.`);
  }

  // 9. Atomically Update MongoDB
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: order._id, paymentStatus: { $ne: "paid" } }, // Safety condition
    {
      $set: {
        paymentStatus: "paid",
        orderStatus: order.orderStatus === "pending" || order.orderStatus === "payment_pending" ? "placed" : order.orderStatus,
        "razorpay.paymentId": razorpayPaymentId,
        "razorpay.status": payment.status,
      },
      $push: {
        statusHistory: {
          status: "placed",
          note: "Payment verified successfully via Razorpay",
          changedBy: "system"
        }
      }
    },
    { new: true }
  );

  if (!updatedOrder) {
    throw new Error("Failed to update order status. It may have already been paid.");
  }

  return {
    orderNumber: updatedOrder.orderNumber,
    paymentStatus: updatedOrder.paymentStatus,
    orderStatus: updatedOrder.orderStatus,
    pricing: updatedOrder.pricing
  };
};
