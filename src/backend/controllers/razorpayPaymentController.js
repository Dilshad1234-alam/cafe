import "server-only";
import { NextResponse } from "next/server";
import { createRazorpayOrderSchema, verifyRazorpayPaymentSchema } from "../validations/paymentValidation";
import { createRazorpayOrderForCafeOrder, verifyAndCompleteRazorpayPayment } from "../services/razorpayPaymentService";
import { verifyAuthToken } from "../utils/authToken";
import User from "../models/User";
import { AUTH_COOKIE_NAME } from "../config/authConfig";

export const createRazorpayOrderController = async (request) => {
  try {
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 1. Validate Payload
    const parseResult = createRazorpayOrderSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { orderNumber, guestToken } = parseResult.data;

    // 2. Auth Context
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    let authenticatedUser = null;

    if (token) {
      const decoded = verifyAuthToken(token);
      if (decoded && decoded.userId) {
        authenticatedUser = await User.findById(decoded.userId).lean();
      }
    }

    // 3. Create Razorpay Order
    const paymentOrderData = await createRazorpayOrderForCafeOrder(
      orderNumber,
      authenticatedUser,
      guestToken
    );

    // 4. Return safe response
    return NextResponse.json(
      {
        success: true,
        message: "Payment order created",
        paymentOrder: paymentOrderData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);

    // Provide safe error messages
    let statusCode = 500;
    let message = "Unable to create payment order";

    if (error.message) {
      if (
        error.message.includes("Order not found") ||
        error.message.includes("already paid") ||
        error.message.includes("cancelled") ||
        error.message.includes("not online") ||
        error.message.includes("Access denied")
      ) {
        statusCode = 400;
        message = error.message;
      }
    }

    return NextResponse.json(
      { success: false, message },
      { status: statusCode }
    );
  }
};

export const verifyRazorpayPaymentController = async (request) => {
  try {
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 1. Validate Payload
    const parseResult = verifyRazorpayPaymentSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 2. Auth Context
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    let authenticatedUser = null;

    if (token) {
      const decoded = verifyAuthToken(token);
      if (decoded && decoded.userId) {
        authenticatedUser = await User.findById(decoded.userId).lean();
      }
    }

    // 3. Verify Payment
    const orderData = await verifyAndCompleteRazorpayPayment(
      data,
      authenticatedUser,
      data.guestToken
    );

    // 4. Return safe response
    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully",
        order: orderData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Razorpay Payment Verification Error:", error);

    let statusCode = 500;
    let message = "Payment verification is taking longer than expected. Please try verification again.";

    if (error.message) {
      if (
        error.message.includes("not found") ||
        error.message.includes("authorized")
      ) {
        statusCode = 403;
        message = "Order not found or access denied";
      } else if (
        error.message.includes("mismatch") ||
        error.message.includes("signature") ||
        error.message.includes("cancelled") ||
        error.message.includes("already paid") ||
        error.message.includes("not online")
      ) {
        statusCode = 400;
        message = error.message;
      }
    }

    return NextResponse.json(
      { success: false, message },
      { status: statusCode }
    );
  }
};
