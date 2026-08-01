import "server-only";
import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true, // sparse because old documents might not have a slug
      index: true,
    },
    shortDescription: {
      type: String,
      maxlength: 150,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    // basePrice maps to the old 'price' for backward compatibility
    // The admin panel will manage 'basePrice' and auto-sync 'price'
    price: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      default: 0,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    // category can be an ObjectId or String (legacy)
    category: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    images: [{
      type: String,
    }],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg", "vegan"],
      default: "veg",
    },
    sizes: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
    }],
    addOns: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
    }],
    stock: {
      type: Number,
      default: 0,
    },
    preparationTime: {
      type: Number,
      default: 15, // in minutes
    },
    ingredients: [{
      type: String,
    }],
    tags: [{
      type: String,
    }],
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
