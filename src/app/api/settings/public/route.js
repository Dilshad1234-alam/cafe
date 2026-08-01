import connectDB from "@/backend/config/db";
import { getPublicSiteSettingsController } from "@/backend/controllers/siteSettingController";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    return await getPublicSiteSettingsController(request);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
