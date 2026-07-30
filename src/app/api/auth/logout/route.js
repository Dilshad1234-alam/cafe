import { logoutController } from "@/backend/controllers/authController";
import { NextResponse } from "next/server";

export async function POST() {
  const { status, body } = await logoutController();
  return NextResponse.json(body, { status });
}
