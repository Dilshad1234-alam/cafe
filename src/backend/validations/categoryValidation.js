import { z } from "zod";

export const categorySchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  description: z.string()
    .max(300, "Description cannot exceed 300 characters")
    .optional()
    .default(""),
  image: z.string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export function validateCategory(data) {
  try {
    const validData = categorySchema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, errors: { form: "Invalid category data" } };
  }
}
