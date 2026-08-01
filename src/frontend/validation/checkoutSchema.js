import { z } from "zod";

export const checkoutSchema = z.object({
  customer: z.object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(60, "Full name must be less than 60 characters"),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
    email: z
      .string()
      .email("Enter a valid email address")
      .optional()
      .or(z.literal("")), // Allow completely empty strings
  }),
  orderType: z.enum(["delivery", "takeaway"]),
  deliveryAddress: z
    .object({
      house: z.string().min(1, "House/Flat number is required"),
      area: z.string().min(2, "Area/Locality is required"),
      landmark: z.string().optional(),
      city: z.string().min(2, "City is required"),
      state: z.string().min(2, "State is required"),
      pincode: z.string().regex(/^[0-9]{6}$/, "Enter a valid 6-digit pincode"),
      label: z.enum(["Home", "Work", "Other"]),
    })
    .optional()
    .nullable(),
  paymentMethod: z.enum(["cash_on_delivery", "pay_at_pickup"]),
}).superRefine((data, ctx) => {
  // If delivery is selected, deliveryAddress is absolutely required
  if (data.orderType === "delivery") {
    if (!data.deliveryAddress || !data.deliveryAddress.house) {
      ctx.addIssue({
        path: ["deliveryAddress", "house"],
        message: "House/Flat number is required for delivery",
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.deliveryAddress || !data.deliveryAddress.area) {
      ctx.addIssue({
        path: ["deliveryAddress", "area"],
        message: "Area/Locality is required for delivery",
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.deliveryAddress || !data.deliveryAddress.city) {
      ctx.addIssue({
        path: ["deliveryAddress", "city"],
        message: "City is required for delivery",
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.deliveryAddress || !data.deliveryAddress.state) {
      ctx.addIssue({
        path: ["deliveryAddress", "state"],
        message: "State is required for delivery",
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.deliveryAddress || !data.deliveryAddress.pincode || !/^[0-9]{6}$/.test(data.deliveryAddress.pincode)) {
      ctx.addIssue({
        path: ["deliveryAddress", "pincode"],
        message: "Valid 6-digit pincode is required for delivery",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});
