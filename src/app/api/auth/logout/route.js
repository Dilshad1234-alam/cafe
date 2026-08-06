import { logoutController } from "@/backend/controllers/authController";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/backend/config/authConfig";

export async function POST() {
  const { status, body } = await logoutController();
  const response = NextResponse.json(body, { status });
  
  response.cookies.delete(AUTH_COOKIE_NAME);
  
  return response;
}
