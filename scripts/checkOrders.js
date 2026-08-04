const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://127.0.0.1:27017/cafe";

const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  orderStatus: String,
}, { strict: false });
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

async function checkOrders() {
  try {
    await mongoose.connect(MONGODB_URI);
    const orders = await Order.find().sort({createdAt: -1}).limit(5).lean();
    console.log("Latest orders:");
    orders.forEach(o => {
      console.log(`_id: ${o._id}, orderNumber: ${o.orderNumber}, status: ${o.orderStatus}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkOrders();
