import "server-only";
import mongoose from "mongoose";

const SiteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "main",
      unique: true,
      index: true,
    },
    business: {
      name: { type: String, required: true },
      shortName: { type: String },
      description: { type: String },
      phone: { type: String, required: true },
      alternatePhone: { type: String },
      email: { type: String },
      addressLine: { type: String, required: true },
      landmark: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      openingHours: { type: String, required: true },
      closingHours: { type: String, required: true },
      timezone: { type: String, default: "Asia/Kolkata" },
      businessDays: [{ type: String }],
    },
    ordering: {
      deliveryEnabled: { type: Boolean, default: true },
      takeawayEnabled: { type: Boolean, default: true },
      minimumOrderAmount: { type: Number, default: 0 },
      deliveryFee: { type: Number, default: 0 },
      freeDeliveryThreshold: { type: Number, default: null },
      taxPercentage: { type: Number, default: 0 },
      maximumItemQuantity: { type: Number, default: 10 },
      estimatedDeliveryMinutes: { type: Number, default: 45 },
      estimatedPickupMinutes: { type: Number, default: 20 },
    },
    social: {
      whatsappNumber: { type: String },
      instagramUrl: { type: String },
      facebookUrl: { type: String },
      googleMapsUrl: { type: String },
    },
    appearance: {
      logoUrl: { type: String },
      faviconUrl: { type: String },
      announcementText: { type: String },
      announcementEnabled: { type: Boolean, default: false },
      footerText: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);
