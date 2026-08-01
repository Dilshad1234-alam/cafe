import { z } from "zod";
import mongoose from "mongoose";

// Helper to validate ObjectId
const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

export const reviewModerationSchema = z.object({
  status: z.enum(["approved", "rejected"], {
    required_error: "Status is required and must be either 'approved' or 'rejected'",
  }),
  adminNote: z.string().max(500, "Admin note cannot exceed 500 characters").optional().or(z.literal("")),
}).strict(); // Reject unknown unsafe fields

export const reviewListQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "pending", "approved", "rejected"]).optional().default("all"),
  rating: z.enum(["all", "1", "2", "3", "4", "5"]).optional().default("all"),
  product: z.string().optional().refine((val) => !val || mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid product ID format",
  }),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sort: z.enum(["newest", "oldest", "rating-high", "rating-low"]).optional().default("newest"),
  startDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid start date format",
  }),
  endDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid end date format",
  }),
});
