import { currentUserController } from "@/backend/controllers/authController";
import { NextResponse } from "next/server";

export async function GET() {
  const { status, body } = await currentUserController();
  return NextResponse.json(body, { status });
}
