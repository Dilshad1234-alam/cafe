import "server-only";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("CRITICAL: JWT_SECRET environment variable is missing.");
}

export function createAuthToken(payload) {
  if (!JWT_SECRET) {
    throw new Error("Server configuration error: missing JWT_SECRET");
  }
  
  // Keep payload thin: only userId and role
  const tokenPayload = {
    userId: payload.userId,
    role: payload.role,
  };
  
  return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAuthToken(token) {
  if (!JWT_SECRET) {
    throw new Error("Server configuration error: missing JWT_SECRET");
  }
  
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
