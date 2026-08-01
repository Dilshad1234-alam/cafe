import connectDB from "@/backend/config/db";
import { requireAdminUser } from "@/backend/middleware/auth";
import { getAdminOrderDetailsController } from "@/backend/controllers/adminOrderController";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    await requireAdminUser();
    await connectDB();
    return await getAdminOrderDetailsController(request, context);
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
