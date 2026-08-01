import connectDB from "@/backend/config/db";
import { requireAdminUser } from "@/backend/middleware/auth";
import { updateCouponStatusController } from "@/backend/controllers/couponController";
import { NextResponse } from "next/server";

export async function PATCH(request, context) {
  try {
    await requireAdminUser();
    await connectDB();
    return await updateCouponStatusController(request, context);
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
