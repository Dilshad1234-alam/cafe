import "server-only";
import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name must be less than 60 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"),
});

export function formatZodErrors(error) {
  if (error instanceof z.ZodError) {
    const formattedErrors = {};
    error.issues.forEach((issue) => {
      formattedErrors[issue.path[0]] = issue.message;
    });
    return formattedErrors;
  }
  return { general: "Validation failed" };
}
