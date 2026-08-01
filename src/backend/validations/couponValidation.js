import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

const baseCouponSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(30, "Code must be at most 30 characters")
    .toUpperCase()
    .trim(),
  description: z
    .string()
    .max(300, "Description cannot exceed 300 characters")
    .optional()
    .nullable(),
  discountType: z.enum(["percentage", "fixed"], {
    required_error: "Discount type is required",
  }),
  discountValue: z.coerce
    .number()
    .positive("Discount value must be greater than 0"),
  minimumOrder: z.coerce
    .number()
    .min(0, "Minimum order cannot be negative")
    .default(0),
  maximumDiscount: z.coerce
    .number()
    .min(0, "Maximum discount cannot be negative")
    .optional()
    .nullable(),
  validFrom: z.coerce.date({
    required_error: "Valid from date is required",
    invalid_type_error: "Invalid valid from date",
  }),
  expiresAt: z.coerce.date({
    required_error: "Expiry date is required",
    invalid_type_error: "Invalid expiry date",
  }),
  usageLimit: z.coerce
    .number()
    .min(1, "Usage limit must be at least 1")
    .optional()
    .nullable(),
  perUserLimit: z.coerce
    .number()
    .min(1, "Per user limit must be at least 1")
    .default(1),
  isActive: z.boolean().default(true),
  applicableCategories: z.array(objectIdSchema).optional().default([]),
  applicableProducts: z.array(objectIdSchema).optional().default([]),
});

export const createCouponSchema = baseCouponSchema.superRefine((data, ctx) => {
  if (data.expiresAt <= data.validFrom) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Expiry date must be after valid from date",
      path: ["expiresAt"],
    });
  }

  if (data.discountType === "percentage" && data.discountValue > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Percentage discount cannot exceed 100",
      path: ["discountValue"],
    });
  }
});

export const updateCouponSchema = baseCouponSchema.superRefine((data, ctx) => {
  if (data.expiresAt <= data.validFrom) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Expiry date must be after valid from date",
      path: ["expiresAt"],
    });
  }

  if (data.discountType === "percentage" && data.discountValue > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Percentage discount cannot exceed 100",
      path: ["discountValue"],
    });
  }
});

export const updateCouponStatusSchema = z.object({
  isActive: z.boolean({
    required_error: "isActive status is required",
    invalid_type_error: "isActive must be a boolean",
  }),
});
