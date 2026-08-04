import "server-only";
import Order from "../models/Order";

/**
 * Returns a summary of payment data (total revenue, transactions, etc.)
 */
export const getAdminPaymentSummary = async () => {
  const result = await Order.aggregate([
    {
      $facet: {
        totalTransactions: [
          { $count: "count" }
        ],
        successfulOnline: [
          { $match: { paymentMethod: { $in: ["online", "razorpay"] }, paymentStatus: "paid" } },
          { $count: "count" }
        ],
        pendingPayments: [
          { $match: { paymentStatus: "pending" } },
          { $count: "count" }
        ],
        failedPayments: [
          { $match: { paymentStatus: { $in: ["failed", "verification_failed"] } } },
          { $count: "count" }
        ],
        codPickupPending: [
          { $match: { paymentMethod: { $in: ["cash_on_delivery", "pay_at_pickup"] }, paymentStatus: "pending" } },
          { $count: "count" }
        ],
        totalCollected: [
          { $match: { paymentStatus: "paid" } },
          { $group: { _id: null, sum: { $sum: "$pricing.total" } } }
        ],
        todayCollected: [
          {
            $match: {
              paymentStatus: "paid",
              updatedAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              },
            }
          },
          { $group: { _id: null, sum: { $sum: "$pricing.total" } } }
        ]
      }
    }
  ]);

  const stats = result[0];

  return {
    totalTransactions: stats.totalTransactions[0]?.count || 0,
    successfulOnlinePayments: stats.successfulOnline[0]?.count || 0,
    pendingPayments: stats.pendingPayments[0]?.count || 0,
    failedPayments: stats.failedPayments[0]?.count || 0,
    codPickupPending: stats.codPickupPending[0]?.count || 0,
    totalCollected: stats.totalCollected[0]?.sum || 0,
    todayCollected: stats.todayCollected[0]?.sum || 0,
  };
};

/**
 * Normalizes an order document into a payment snapshot
 */
const normalizePayment = (order) => ({
  id: order._id.toString(),
  orderNumber: order.orderNumber,
  customer: {
    name: order.customer.fullName,
    phone: order.customer.phone,
    email: order.customer.email,
  },
  amount: order.pricing.total,
  currency: order.razorpay?.currency || "INR",
  paymentMethod: order.paymentMethod,
  paymentStatus: order.paymentStatus,
  gatewayOrderId: order.razorpay?.orderId || null,
  gatewayPaymentId: order.razorpay?.paymentId || null,
  verifiedAt: order.razorpay?.createdAt || order.updatedAt,
  createdAt: order.createdAt,
  orderStatus: order.orderStatus,
  orderType: order.orderType,
});

/**
 * Lists paginated and filtered payments
 */
export const listAdminPayments = async (filters, page = 1, limit = 10, sort = "newest") => {
  const query = {};

  if (filters.search) {
    query.$or = [
      { orderNumber: { $regex: filters.search, $options: "i" } },
      { "razorpay.paymentId": { $regex: filters.search, $options: "i" } },
      { "razorpay.orderId": { $regex: filters.search, $options: "i" } },
      { "customer.phone": { $regex: filters.search, $options: "i" } },
      { "customer.fullName": { $regex: filters.search, $options: "i" } },
    ];
  }

  if (filters.method && filters.method !== "all") {
    query.paymentMethod = filters.method === "razorpay" ? "online" : filters.method;
  }

  if (filters.paymentStatus && filters.paymentStatus !== "all") {
    query.paymentStatus = filters.paymentStatus;
  }

  if (filters.orderStatus && filters.orderStatus !== "all") {
    query.orderStatus = filters.orderStatus;
  }

  if (filters.dateRange && filters.dateRange !== "all") {
    const now = new Date();
    if (filters.dateRange === "today") {
      query.createdAt = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
    } else if (filters.dateRange === "last_7_days") {
      query.createdAt = { $gte: new Date(now.setDate(now.getDate() - 7)) };
    } else if (filters.dateRange === "last_30_days") {
      query.createdAt = { $gte: new Date(now.setDate(now.getDate() - 30)) };
    }
  }

  let sortOptions = { createdAt: -1 };
  if (sort === "oldest") sortOptions = { createdAt: 1 };
  if (sort === "amount-high") sortOptions = { "pricing.total": -1 };
  if (sort === "amount-low") sortOptions = { "pricing.total": 1 };

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find(query)
      .select("orderNumber customer pricing paymentMethod paymentStatus razorpay createdAt updatedAt orderStatus orderType")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments(query),
  ]);

  return {
    payments: orders.map(normalizePayment),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Gets payment details for a specific order by ID or orderNumber
 */
export const getAdminPaymentDetails = async (idOrNumber) => {
  let query = {};
  if (idOrNumber.startsWith("TZC-")) {
    query.orderNumber = idOrNumber;
  } else {
    query._id = idOrNumber;
  }

  const order = await Order.findOne(query).lean();

  if (!order) {
    throw new Error("Payment/Order not found");
  }

  return normalizePayment(order);
};
