import "server-only";
import mongoose from "mongoose";
import Coupon from "../models/Coupon";

export async function listAdminCoupons(query = {}) {
  const { search, status, discountType, page = 1, limit = 10, sort = "newest" } = query;
  
  const filter = {};
  
  if (search) {
    filter.$or = [
      { code: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  
  const now = new Date();

  if (status && status !== "all") {
    if (status === "active") {
      filter.isActive = true;
      filter.validFrom = { $lte: now };
      filter.expiresAt = { $gt: now };
    } else if (status === "inactive") {
      filter.isActive = false;
    } else if (status === "expired") {
      filter.expiresAt = { $lte: now };
    } else if (status === "scheduled") {
      filter.isActive = true;
      filter.validFrom = { $gt: now };
    }
  }

  if (discountType && discountType !== "all") {
    filter.discountType = discountType;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  let sortOptions = {};
  if (sort === "oldest") sortOptions = { createdAt: 1 };
  else if (sort === "expiry-soon") sortOptions = { expiresAt: 1 };
  else if (sort === "code-asc") sortOptions = { code: 1 };
  else if (sort === "code-desc") sortOptions = { code: -1 };
  else sortOptions = { createdAt: -1 }; // newest by default

  const [coupons, total] = await Promise.all([
    Coupon.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Coupon.countDocuments(filter)
  ]);

  return {
    coupons,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    }
  };
}

export async function getAdminCouponById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid coupon ID");
  }

  const coupon = await Coupon.findById(id)
    .populate("applicableCategories", "name")
    .populate("applicableProducts", "name")
    .lean();
    
  if (!coupon) {
    throw new Error("Coupon not found");
  }

  return coupon;
}

export async function createCoupon(data) {
  const existingCoupon = await Coupon.findOne({ code: data.code.toUpperCase() }).lean();
  if (existingCoupon) {
    throw new Error("A coupon with this code already exists");
  }

  const newCoupon = new Coupon(data);
  await newCoupon.save();
  return newCoupon.toObject();
}

export async function updateCoupon(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid coupon ID");
  }

  const existingCoupon = await Coupon.findById(id);
  if (!existingCoupon) {
    throw new Error("Coupon not found");
  }

  // Prevent duplicate code if code was changed
  if (data.code.toUpperCase() !== existingCoupon.code) {
    const duplicate = await Coupon.findOne({ code: data.code.toUpperCase() }).lean();
    if (duplicate) {
      throw new Error("A coupon with this code already exists");
    }
  }

  // Ensure dates are correctly evaluated
  Object.assign(existingCoupon, data);
  await existingCoupon.save();

  return existingCoupon.toObject();
}

export async function updateCouponStatus(id, isActive) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid coupon ID");
  }

  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new Error("Coupon not found");
  }

  coupon.isActive = isActive;
  await coupon.save();

  return coupon.toObject();
}

export async function deleteCoupon(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid coupon ID");
  }

  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new Error("Coupon not found");
  }

  if (coupon.usageCount > 0) {
    throw new Error("This coupon has already been used. Deactivate it instead.");
  }

  await Coupon.findByIdAndDelete(id);
  return { success: true };
}
