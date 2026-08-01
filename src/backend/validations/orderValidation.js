import { z } from "zod";

export const createOrderSchema = z.object({
  customer: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
  }),
  orderType: z.enum(["delivery", "takeaway"]),
  deliveryAddress: z.object({
    house: z.string().min(1, "House/Flat details required"),
    area: z.string().min(1, "Area details required"),
    landmark: z.string().optional(),
    city: z.string().min(1, "City required"),
    state: z.string().min(1, "State required"),
    pincode: z.string().regex(/^\d{6}$/, "Must be exactly 6 digits"),
    label: z.string().optional(),
  }).nullable().optional(),
  paymentMethod: z.enum(["cash_on_delivery", "pay_at_pickup", "online"]),
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product ID required"),
      quantity: z.number().int().min(1).max(20),
      selectedSize: z.any().optional(),
      selectedAddOns: z.array(z.any()).optional().default([]),
    })
  ).min(1, "Order must contain at least one item"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional().default(""),
}).superRefine((data, ctx) => {
  if (data.orderType === "delivery") {
    if (!data.deliveryAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Delivery address is required for delivery orders",
        path: ["deliveryAddress"],
      });
    }
    if (data.paymentMethod !== "cash_on_delivery") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Delivery orders must use cash_on_delivery for now",
        path: ["paymentMethod"],
      });
    }
  } else if (data.orderType === "takeaway") {
    if (data.paymentMethod !== "pay_at_pickup") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Takeaway orders must use pay_at_pickup for now",
        path: ["paymentMethod"],
      });
    }
  }
});
