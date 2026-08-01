import "server-only";
import Order from "../models/Order";

export async function listAdminOrders(query = {}) {
  const { search, status, paymentStatus, paymentMethod, orderType, page = 1, limit = 10, sort = "newest" } = query;
  
  const filter = {};
  
  if (search) {
    // Search by order number, name, phone, or email
    filter.$or = [
      { orderNumber: { $regex: search, $options: "i" } },
      { "customer.fullName": { $regex: search, $options: "i" } },
      { "customer.phone": { $regex: search, $options: "i" } },
      { "customer.email": { $regex: search, $options: "i" } }
    ];
  }
  
  if (status && status !== "all") {
    filter.orderStatus = status;
  }
  if (paymentStatus && paymentStatus !== "all") {
    filter.paymentStatus = paymentStatus;
  }
  if (paymentMethod && paymentMethod !== "all") {
    filter.paymentMethod = paymentMethod;
  }
  if (orderType && orderType !== "all") {
    filter.orderType = orderType;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const sortOptions = {};
  if (sort === "oldest") sortOptions.createdAt = 1;
  else if (sort === "totalHigh") sortOptions["pricing.total"] = -1;
  else if (sort === "totalLow") sortOptions["pricing.total"] = 1;
  else sortOptions.createdAt = -1; // newest by default

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-guestTokenHash -user") // Exclude sensitive fields
      .lean(),
    Order.countDocuments(filter)
  ]);

  return {
    orders,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    }
  };
}

export async function getAdminOrderDetails(orderNumber) {
  const order = await Order.findOne({ orderNumber }).select("-guestTokenHash").lean();
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
}

export async function updateOrderStatus(orderNumber, newStatus, note, adminUser) {
  const order = await Order.findOne({ orderNumber });
  if (!order) {
    throw new Error("Order not found");
  }

  const currentStatus = order.orderStatus;

  if (currentStatus === newStatus) {
    throw new Error(`Order is already in ${newStatus} status`);
  }

  // Validate state transitions
  if (currentStatus === "cancelled") {
    throw new Error("Cannot change status of a cancelled order");
  }
  if (currentStatus === "delivered") {
    throw new Error("Cannot change status of a delivered order");
  }

  let isValidTransition = false;

  if (newStatus === "cancelled") {
    if (["placed", "confirmed", "preparing"].includes(currentStatus)) {
      if (currentStatus === "preparing" && !note) {
        throw new Error("Cancellation reason is required when cancelling a preparing order");
      }
      isValidTransition = true;
    } else {
      throw new Error(`Cannot cancel order from ${currentStatus} status`);
    }
  } else {
    // Normal forward transitions
    const transitions = {
      placed: ["confirmed"],
      confirmed: ["preparing"],
      preparing: ["ready"],
      ready: order.orderType === "delivery" ? ["out_for_delivery"] : ["delivered"],
      out_for_delivery: order.orderType === "delivery" ? ["delivered"] : [],
    };

    if (transitions[currentStatus] && transitions[currentStatus].includes(newStatus)) {
      isValidTransition = true;
    }
  }

  if (!isValidTransition) {
    throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
  }

  // Update order
  order.orderStatus = newStatus;
  
  // Add history entry
  const historyEntry = {
    status: newStatus,
    note: note || "",
    changedBy: adminUser?.fullName || adminUser?.id || "Admin",
    changedAt: new Date()
  };
  
  order.statusHistory.push(historyEntry);

  await order.save();
  return order.toObject();
}

export async function updatePaymentStatus(orderNumber, newPaymentStatus, adminUser) {
  const order = await Order.findOne({ orderNumber });
  if (!order) {
    throw new Error("Order not found");
  }

  // Business rules for payments
  if (order.paymentStatus === "paid" && newPaymentStatus !== "refunded") {
    throw new Error("Cannot change a paid order to pending or failed");
  }

  // We allow changing pending to paid, failed, or refunded.
  // We allow changing COD to paid.
  // In a real app, online payment transitions would be restricted strictly to webhook callbacks.

  order.paymentStatus = newPaymentStatus;
  await order.save();
  return order.toObject();
}
