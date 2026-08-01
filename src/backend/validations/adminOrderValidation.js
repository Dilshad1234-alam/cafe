import { z } from "zod";

const VALID_STATUSES = [
  "placed",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const VALID_PAYMENT_STATUSES = [
  "pending",
  "paid",
  "failed",
  "refunded"
];

export const updateOrderStatusSchema = z.object({
  status: z.enum(VALID_STATUSES, {
    errorMap: () => ({ message: "Invalid order status" }),
  }),
  note: z.string().max(500).optional(),
}).refine(data => {
  // If status is cancelled, we might enforce note here, but since the requirement 
  // says "Require cancellation reason when cancelling from preparing", we'll enforce that 
  // in the service logic where we know the current state.
  return true;
});

export const updatePaymentStatusSchema = z.object({
  paymentStatus: z.enum(VALID_PAYMENT_STATUSES, {
    errorMap: () => ({ message: "Invalid payment status" }),
  })
});
