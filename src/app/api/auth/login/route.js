import { loginController } from "@/backend/controllers/authController";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getAuthCookieOptions } from "@/backend/config/authConfig";

export async function POST(request) {
  const { status, body } = await loginController(request);
  const response = NextResponse.json(body, { status });
  
  if (body.success && body.token) {
    response.cookies.set(AUTH_COOKIE_NAME, body.token, getAuthCookieOptions());
  }
  
  return response;
}
