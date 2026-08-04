import { z } from "zod";

export const createRazorpayOrderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required").max(100, "Order number is too long"),
  guestToken: z.string().optional(),
});

export const verifyRazorpayPaymentSchema = z.object({
  internalOrderNumber: z.string().min(1, "Order number is required").max(100, "Order number is too long"),
  razorpayPaymentId: z.string().min(1, "Payment ID is required").max(100, "Payment ID is too long"),
  razorpayOrderId: z.string().min(1, "Order ID is required").max(100, "Order ID is too long"),
  razorpaySignature: z.string().min(1, "Signature is required").max(200, "Signature is too long"),
  guestToken: z.string().optional(),
});
