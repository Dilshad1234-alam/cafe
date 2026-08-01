import "server-only";
import User from "../models/User";
import Order from "../models/Order";
import mongoose from "mongoose";

export async function listAdminCustomers(query = {}) {
  const { search, status, role, page = 1, limit = 10, sort = "newest" } = query;
  
  const matchFilter = {};
  
  if (search) {
    matchFilter.$or = [
      { fullname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } }
    ];
  }
  
  if (status && status !== "all") {
    matchFilter.isActive = status === "active";
  }
  
  if (role && role !== "all") {
    matchFilter.role = role;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  let sortOptions = {};
  if (sort === "oldest") sortOptions = { createdAt: 1 };
  else if (sort === "nameAsc") sortOptions = { fullname: 1 };
  else if (sort === "spendingHigh") sortOptions = { totalSpending: -1 };
  else if (sort === "ordersHigh") sortOptions = { totalOrders: -1 };
  else sortOptions = { createdAt: -1 }; // newest by default

  const aggregationPipeline = [
    { $match: matchFilter },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "user",
        as: "orders"
      }
    },
    {
      $addFields: {
        totalOrders: { $size: "$orders" },
        deliveredOrdersCount: {
          $size: {
            $filter: {
              input: "$orders",
              as: "order",
              cond: { $eq: ["$$order.orderStatus", "delivered"] }
            }
          }
        },
        totalSpending: {
          $sum: {
            $map: {
              input: {
                $filter: {
                  input: "$orders",
                  as: "order",
                  cond: { $eq: ["$$order.orderStatus", "delivered"] }
                }
              },
              as: "deliveredOrder",
              in: "$$deliveredOrder.pricing.total"
            }
          }
        }
      }
    },
    { $project: { password: 0, orders: 0 } }, // exclude password and raw orders array
    { $sort: sortOptions },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: parseInt(limit) }]
      }
    }
  ];

  const result = await User.aggregate(aggregationPipeline);
  const total = result[0]?.metadata[0]?.total || 0;
  const customers = result[0]?.data || [];

  return {
    customers,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    }
  };
}

export async function getAdminCustomerDetails(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid customer ID");
  }

  const user = await User.findById(id).select("-password").lean();
  if (!user) {
    throw new Error("Customer not found");
  }

  // Fetch orders and calculate stats
  const orders = await Order.find({ user: id })
    .sort({ createdAt: -1 })
    .select("-guestTokenHash -user")
    .lean();

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.orderStatus === "delivered");
  const cancelledOrdersCount = orders.filter(o => o.orderStatus === "cancelled").length;
  
  const totalSpending = deliveredOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0);

  return {
    user,
    stats: {
      totalOrders,
      deliveredOrdersCount: deliveredOrders.length,
      cancelledOrdersCount,
      totalSpending,
    },
    recentOrders: orders.slice(0, 10), // Give last 10 orders for the UI
  };
}

export async function updateCustomerStatus(id, isActive, currentAdminId) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid customer ID");
  }

  if (id === currentAdminId) {
    throw new Error("Cannot change your own account status");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new Error("Customer not found");
  }

  user.isActive = isActive;
  await user.save();

  const updatedUser = user.toObject();
  delete updatedUser.password;
  
  return updatedUser;
}
