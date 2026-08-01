import Order from "../models/Order";
import { generateOrderNumber } from "../utils/generateOrderNumber";
import { generateGuestOrderToken, hashGuestOrderToken, verifyGuestOrderToken } from "../utils/guestOrderToken";
import { resolveOrderItemsAndPricing } from "./orderPricingService";

export const createOrder = async (orderData, authenticatedUser = null) => {
  // Recalculate and verify pricing server-side
  const { items, pricing } = await resolveOrderItemsAndPricing(orderData.items);
  
  // Generate a unique order number
  const orderNumber = await generateOrderNumber();

  let guestToken = null;
  let guestTokenHash = null;

  if (!authenticatedUser) {
    guestToken = generateGuestOrderToken();
    guestTokenHash = hashGuestOrderToken(guestToken);
  }

  const newOrder = new Order({
    orderNumber,
    user: authenticatedUser ? authenticatedUser._id : null,
    guestTokenHash,
    customer: orderData.customer,
    orderType: orderData.orderType,
    deliveryAddress: orderData.orderType === "delivery" ? orderData.deliveryAddress : null,
    items,
    pricing,
    paymentMethod: orderData.paymentMethod,
    paymentStatus: "pending",
    orderStatus: "placed",
    notes: orderData.notes,
    statusHistory: [
      {
        status: "placed",
        changedAt: new Date(),
        note: "Order placed successfully",
      }
    ]
  });

  await newOrder.save();

  return {
    order: newOrder,
    guestAccessToken: guestToken,
  };
};

export const getOrderByNumber = async (orderNumber, requester = null, guestToken = null) => {
  const order = await Order.findOne({ orderNumber }).lean();
  if (!order) {
    return null;
  }

  // Auth check for authenticated orders
  if (order.user) {
    if (!requester || requester._id.toString() !== order.user.toString()) {
      throw new Error("Access denied");
    }
    return order;
  }

  // Auth check for guest orders
  if (!order.user) {
    // If the requester is an admin, they might bypass this, but for now we enforce token
    if (!guestToken) {
      throw new Error("Access denied: Guest token required");
    }
    const isValidToken = verifyGuestOrderToken(guestToken, order.guestTokenHash);
    if (!isValidToken) {
      throw new Error("Access denied: Invalid guest token");
    }
    return order;
  }

  return null;
};

export const getCustomerOrders = async (requester, page = 1, limit = 10) => {
  if (!requester || !requester._id) {
    throw new Error("Authentication required");
  }

  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: requester._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
    
  const total = await Order.countDocuments({ user: requester._id });

  return {
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
  };
};
