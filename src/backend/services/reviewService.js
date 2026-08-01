import "server-only";
import mongoose from "mongoose";
import Review from "../models/Review";
import MenuItem from "../models/MenuItem";
import User from "../models/User";

/**
 * Recalculate average rating for a given product and update it.
 */
export async function recalculateProductRating(productId) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  // Use aggregation to find the average and count of 'approved' reviews only
  const stats = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
        status: "approved",
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  let avgRating = 0;
  let count = 0;

  if (stats.length > 0) {
    avgRating = Math.round(stats[0].averageRating * 10) / 10; // round to 1 decimal place
    count = stats[0].reviewCount;
  }

  await MenuItem.findByIdAndUpdate(productId, {
    averageRating: avgRating,
    reviewCount: count,
  });

  return { averageRating: avgRating, reviewCount: count };
}

export async function listAdminReviews(query = {}) {
  const { search, status, rating, product, page = 1, limit = 10, sort = "newest", startDate, endDate } = query;
  
  const filter = {};
  
  if (status && status !== "all") {
    filter.status = status;
  }

  if (rating && rating !== "all") {
    filter.rating = parseInt(rating);
  }

  if (product && mongoose.Types.ObjectId.isValid(product)) {
    filter.product = product;
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  if (search) {
    // Search could be in comment, or we need to find user IDs matching name/email to search reviews by those users
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    }).select('_id');
    const userIds = users.map(u => u._id);

    const products = await MenuItem.find({
      name: { $regex: search, $options: "i" }
    }).select('_id');
    const productIds = products.map(p => p._id);

    filter.$or = [
      { comment: { $regex: search, $options: "i" } },
      { user: { $in: userIds } },
      { product: { $in: productIds } }
    ];
  }

  let sortOptions = {};
  if (sort === "oldest") sortOptions = { createdAt: 1 };
  else if (sort === "rating-high") sortOptions = { rating: -1, createdAt: -1 };
  else if (sort === "rating-low") sortOptions = { rating: 1, createdAt: -1 };
  else sortOptions = { createdAt: -1 }; // newest by default

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [reviews, total] = await Promise.all([
    Review.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("user", "name email image")
      .populate("product", "name imageUrl")
      .populate("moderatedBy", "name")
      .lean(),
    Review.countDocuments(filter)
  ]);

  return {
    reviews,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    }
  };
}

export async function getAdminReviewById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid review ID");
  }

  const review = await Review.findById(id)
    .populate("user", "name email image phone")
    .populate("product", "name imageUrl")
    .populate("moderatedBy", "name email")
    .lean();
    
  if (!review) {
    throw new Error("Review not found");
  }

  return review;
}

export async function moderateReview(id, status, adminNote, adminUserId) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid review ID");
  }

  const review = await Review.findById(id);
  if (!review) {
    throw new Error("Review not found");
  }

  const originalStatus = review.status;

  // The rules allow: pending -> approved, pending -> rejected, approved -> rejected, rejected -> approved
  // So any change is effectively allowed as long as status is 'approved' or 'rejected'.
  review.status = status;
  if (adminNote !== undefined) {
    review.adminNote = adminNote;
  }
  review.moderatedBy = adminUserId;
  review.moderatedAt = new Date();
  
  await review.save();

  // If status changed from or to 'approved', we must recalculate
  if (originalStatus !== status && (originalStatus === "approved" || status === "approved")) {
    await recalculateProductRating(review.product);
  }

  return await getAdminReviewById(id);
}

export async function deleteReview(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid review ID");
  }

  const review = await Review.findById(id);
  if (!review) {
    throw new Error("Review not found");
  }

  await Review.findByIdAndDelete(id);

  // If it was approved, recalculate rating
  if (review.status === "approved") {
    await recalculateProductRating(review.product);
  }

  return { success: true };
}
