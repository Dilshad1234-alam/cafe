import "server-only";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/backend/utils/authToken";
import { AUTH_COOKIE_NAME } from "@/backend/config/authConfig";
import { getUserById, sanitizeUser } from "@/backend/services/authService";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  
  if (!token) {
    return null;
  }
  
  const payload = verifyAuthToken(token);
  if (!payload || !payload.userId) {
    return null;
  }
  
  try {
    const user = await getUserById(payload.userId);
    if (!user || !user.isActive) {
      return null;
    }
    return sanitizeUser(user);
  } catch (error) {
    console.error("Auth middleware error fetching user:", error);
    return null;
  }
}

export async function requireAuthenticatedUser() {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdminUser() {
  const user = await requireAuthenticatedUser();
  // We check the latest database role directly from the sanitized user object
  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
}
