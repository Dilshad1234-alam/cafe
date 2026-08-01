import "server-only";
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: false, // In case a product gets deleted later
    },
    productId: { type: String, required: true },
    slug: { type: String },
    name: { type: String, required: true },
    image: { type: String },
    selectedSize: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    selectedAddOns: {
      type: Array,
      default: [],
    },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1, max: 20 },
    itemTotal: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    guestTokenHash: {
      type: String,
      default: null,
    },
    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true, index: true },
      email: { type: String },
    },
    orderType: {
      type: String,
      enum: ["delivery", "takeaway"],
      required: true,
    },
    deliveryAddress: {
      house: { type: String },
      area: { type: String },
      landmark: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      label: { type: String },
    },
    items: [OrderItemSchema],
    pricing: {
      subtotal: { type: Number, required: true },
      deliveryFee: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "pay_at_pickup", "online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
      index: true,
    },
    notes: {
      type: String,
      maxlength: 500,
      default: "",
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        note: { type: String },
        changedBy: { type: String },
      }
    ]
  },
  { timestamps: true }
);

// Indexes
OrderSchema.index({ createdAt: -1 });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
