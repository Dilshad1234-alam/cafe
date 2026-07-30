import { loginController } from "@/backend/controllers/authController";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { status, body } = await loginController(request);
  return NextResponse.json(body, { status });
}
