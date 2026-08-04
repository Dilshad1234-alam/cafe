import "server-only";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuthToken } from "@/backend/utils/authToken";
import { AUTH_COOKIE_NAME } from "@/backend/config/authConfig";
import { getUserById, sanitizeUser } from "@/backend/services/authService";

export async function getAuthenticatedUser() {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else {
    // Fallback to cookie
    const cookieStore = await cookies();
    token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  }

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
    // If it's an API request, we probably want to return 401 instead of redirect, 
    // but the Next.js standard `redirect` throws a NEXT_REDIRECT error which is caught.
    // For now, we will handle redirect for standard page requests.
    const headersList = await headers();
    const accept = headersList.get("accept");
    if (accept && accept.includes("application/json")) {
      throw new Error("Authentication required");
    }
    redirect("/login");
  }
  return user;
}

export async function requireAdminUser() {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    const headersList = await headers();
    const accept = headersList.get("accept");
    if (accept && accept.includes("application/json")) {
      throw new Error("Authentication required");
    }
    redirect("/login?redirect=/admin");
  }

  // We check the latest database role directly from the sanitized user object
  if (user.role !== "admin") {
    const headersList = await headers();
    const accept = headersList.get("accept");
    if (accept && accept.includes("application/json")) {
      throw new Error("Forbidden");
    }
    redirect("/");
  }
  return user;
}
