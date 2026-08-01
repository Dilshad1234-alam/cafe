import { NextResponse } from "next/server";
import { getDashboardMetrics } from "../services/adminDashboardService";

export async function getDashboardController() {
  try {
    const data = await getDashboardMetrics();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard metrics" },
      { status: 500 }
    );
  }
}
