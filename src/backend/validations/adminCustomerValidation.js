import { z } from "zod";

export const updateCustomerStatusSchema = z.object({
  isActive: z.boolean({
    required_error: "isActive status is required",
    invalid_type_error: "isActive must be a boolean",
  }),
});
