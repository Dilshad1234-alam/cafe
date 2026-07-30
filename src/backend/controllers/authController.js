import "server-only";
import { cookies } from "next/headers";
import { registerSchema, loginSchema, formatZodErrors } from "@/backend/validations/authValidation";
import { findUserByEmail, createUserAccount, authenticateUser, sanitizeUser } from "@/backend/services/authService";
import { createAuthToken } from "@/backend/utils/authToken";
import { AUTH_COOKIE_NAME, getAuthCookieOptions } from "@/backend/config/authConfig";
import { getAuthenticatedUser } from "@/backend/middleware/auth";

export async function registerController(request) {
  try {
    const body = await request.json();
    
    // Validate
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return {
        status: 400,
        body: {
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(validationResult.error),
        }
      };
    }
    
    const data = validationResult.data;
    
    // Check duplicate email
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      return {
        status: 409,
        body: {
          success: false,
          message: "Validation failed",
          errors: { email: "Email is already registered" },
        }
      };
    }
    
    // Create user
    const newUser = await createUserAccount(data);
    
    return {
      status: 201,
      body: {
        success: true,
        message: "Registration successful. Please login.",
        user: sanitizeUser(newUser),
      }
    };
  } catch (error) {
    console.error("Register Error:", error);
    return {
      status: 500,
      body: { success: false, message: "Internal server error" }
    };
  }
}

export async function loginController(request) {
  try {
    const body = await request.json();
    
    // Validate
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return {
        status: 400,
        body: {
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(validationResult.error),
        }
      };
    }
    
    const data = validationResult.data;
    
    // Authenticate
    let user;
    try {
      user = await authenticateUser(data.email, data.password);
    } catch (err) {
      if (err.message === "Account is inactive") {
        return {
          status: 403,
          body: { success: false, message: "Account is inactive" }
        };
      }
      throw err;
    }

    if (!user) {
      return {
        status: 401,
        body: {
          success: false,
          message: "Invalid email or password",
        }
      };
    }
    
    // Create JWT
    const token = createAuthToken({ userId: user._id.toString(), role: user.role });
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
    
    return {
      status: 200,
      body: {
        success: true,
        message: "Login successful",
        user: sanitizeUser(user),
      }
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      status: 500,
      body: { success: false, message: "Internal server error" }
    };
  }
}

export async function logoutController() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    
    return {
      status: 200,
      body: {
        success: true,
        message: "Logged out successfully",
      }
    };
  } catch (error) {
    console.error("Logout Error:", error);
    return {
      status: 500,
      body: { success: false, message: "Internal server error" }
    };
  }
}

export async function currentUserController() {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return {
        status: 200,
        body: {
          success: false,
          message: "Unauthenticated",
          user: null,
        }
      };
    }
    
    return {
      status: 200,
      body: {
        success: true,
        message: "User fetched successfully",
        user,
      }
    };
  } catch (error) {
    console.error("Current User Error:", error);
    return {
      status: 500,
      body: { success: false, message: "Internal server error" }
    };
  }
}
