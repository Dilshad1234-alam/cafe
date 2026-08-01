import { NextResponse } from "next/server";
import { 
  reviewListQuerySchema, 
  reviewModerationSchema 
} from "../validations/reviewValidation";
import { 
  listAdminReviews, 
  getAdminReviewById, 
  moderateReview, 
  deleteReview 
} from "../services/reviewService";

export const listAdminReviewsController = async (request) => {
  try {
    const url = new URL(request.url);
    const query = {
      search: url.searchParams.get("search") || "",
      status: url.searchParams.get("status") || "all",
      rating: url.searchParams.get("rating") || "all",
      product: url.searchParams.get("product") || "",
      page: url.searchParams.get("page") || "1",
      limit: url.searchParams.get("limit") || "10",
      sort: url.searchParams.get("sort") || "newest",
      startDate: url.searchParams.get("startDate") || "",
      endDate: url.searchParams.get("endDate") || "",
    };

    const parseResult = reviewListQuerySchema.safeParse(query);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid query parameters", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const data = await listAdminReviews(parseResult.data);
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("List Admin Reviews Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getAdminReviewController = async (request, context) => {
  try {
    const { id } = await context.params;
    const data = await getAdminReviewById(id);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Get Admin Review Error:", error);
    if (error.message === "Invalid review ID" || error.message === "Review not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const moderateReviewController = async (request, context) => {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parseResult = reviewModerationSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const adminUserId = request.user._id; // Assuming requireAdminUser sets request.user
    
    const { status, adminNote } = parseResult.data;
    const updatedReview = await moderateReview(id, status, adminNote, adminUserId);

    return NextResponse.json({ 
      success: true, 
      message: "Review moderated successfully", 
      review: updatedReview 
    }, { status: 200 });

  } catch (error) {
    console.error("Moderate Review Error:", error);
    if (error.message === "Invalid review ID" || error.message === "Review not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const deleteReviewController = async (request, context) => {
  try {
    const { id } = await context.params;
    await deleteReview(id);

    return NextResponse.json({ 
      success: true, 
      message: "Review deleted successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Delete Review Error:", error);
    if (error.message === "Invalid review ID" || error.message === "Review not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
