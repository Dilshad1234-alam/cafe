import connectDB from "@/backend/config/db";
import { requireAdminUser } from "@/backend/middleware/auth";
import { 
  getAdminReviewController, 
  deleteReviewController 
} from "@/backend/controllers/reviewController";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const adminUser = await requireAdminUser();
    request.user = adminUser;

    await connectDB();
    return await getAdminReviewController(request, context);
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const adminUser = await requireAdminUser();
    request.user = adminUser;

    await connectDB();
    return await deleteReviewController(request, context);
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
