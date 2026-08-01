import connectDB from "@/backend/config/db";
import { requireAdminUser } from "@/backend/middleware/auth";
import { 
  getAdminSiteSettingsController, 
  updateAdminSiteSettingsController 
} from "@/backend/controllers/siteSettingController";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await requireAdminUser();
    await connectDB();
    return await getAdminSiteSettingsController(request);
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await requireAdminUser();
    await connectDB();
    return await updateAdminSiteSettingsController(request);
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
