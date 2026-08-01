import connectDB from "@/backend/config/db";
import { requireAdminUser } from "@/backend/middleware/auth";
import { listAdminReviewsController } from "@/backend/controllers/reviewController";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const adminUser = await requireAdminUser();
    // In nextjs app router middleware, we typically set user in req, but here we can just pass the user to the request obj dynamically
    request.user = adminUser;
    
    await connectDB();
    return await listAdminReviewsController(request);
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
