import "server-only";

export const AUTH_COOKIE_NAME = "tasty_zone_token";
export const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  };
}
