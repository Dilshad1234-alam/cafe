import { getDashboardController } from "@/backend/controllers/adminDashboardController";
import connectToDatabase from "@/backend/config/db";
import { requireAdminUser } from "@/backend/middleware/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Verify Admin Role Server-Side
    await requireAdminUser();
    
    // 2. Connect DB
    await connectToDatabase();
    
    // 3. Return metrics
    return getDashboardController(request);
  } catch (error) {
    if (error.message === "Forbidden") {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 });
    }
    if (error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
