import { registerController } from "@/backend/controllers/authController";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { status, body } = await registerController(request);
  return NextResponse.json(body, { status });
}
