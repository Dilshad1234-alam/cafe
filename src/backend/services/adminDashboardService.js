import "server-only";
import Order from "../models/Order";
import MenuItem from "../models/MenuItem";
import User from "../models/User";

export async function getDashboardMetrics() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 1. Order Metrics
  const allOrders = await Order.find().lean();
  
  const totalOrders = allOrders.length;
  const todayOrders = allOrders.filter(o => new Date(o.createdAt) >= startOfToday).length;
  
  const pendingOrders = allOrders.filter(o => 
    ["placed", "confirmed", "preparing", "ready", "out_for_delivery"].includes(o.orderStatus)
  ).length;
  
  const completedOrders = allOrders.filter(o => o.orderStatus === "delivered").length;
  const cancelledOrders = allOrders.filter(o => o.orderStatus === "cancelled").length;

  // 2. Revenue Metrics (Count valid, delivered/completed orders)
  // For safety, we only count orders that were successfully completed.
  const validRevenueOrders = allOrders.filter(o => o.orderStatus === "delivered" && (o.paymentStatus === "paid" || o.paymentMethod === "cash_on_delivery" || o.paymentMethod === "pay_at_pickup"));
  
  const totalRevenue = validRevenueOrders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
  
  const todayRevenue = validRevenueOrders
    .filter(o => new Date(o.createdAt) >= startOfToday)
    .reduce((sum, o) => sum + (o.pricing?.total || 0), 0);

  // 3. Product Metrics (Using canonical MenuItem)
  const allProducts = await MenuItem.find().lean();
  const totalProducts = allProducts.length;
  const availableProducts = allProducts.filter(p => p.isAvailable !== false).length;
  const unavailableProducts = allProducts.filter(p => p.isAvailable === false).length;

  // 4. Customer Metrics
  const totalCustomers = await User.countDocuments({ role: "customer" });

  // 5. Recent Orders (Top 5)
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('orderNumber createdAt orderStatus paymentStatus pricing orderType customer.fullName')
    .lean();

  // 6. Popular Products (Derive from all orders safely)
  const productCounts = {};
  allOrders.forEach(order => {
    // Only count products from completed orders for "popularity"
    if (order.orderStatus === "delivered") {
      order.items?.forEach(item => {
        if (!productCounts[item.name]) {
          productCounts[item.name] = { name: item.name, count: 0, revenue: 0 };
        }
        productCounts[item.name].count += item.quantity;
        productCounts[item.name].revenue += item.itemTotal;
      });
    }
  });

  const popularProducts = Object.values(productCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalOrders,
    todayOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue,
    todayRevenue,
    totalProducts,
    availableProducts,
    unavailableProducts,
    totalCustomers,
    recentOrders,
    popularProducts
  };
}
