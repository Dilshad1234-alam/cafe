import { z } from "zod";

export const sizeSchema = z.object({
  name: z.string().min(1, "Size name is required"),
  price: z.number().min(0, "Price must be positive"),
});

export const addOnSchema = z.object({
  name: z.string().min(1, "Add-on name is required"),
  price: z.number().min(0, "Price must be positive"),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  shortDescription: z.string().max(150).optional().default(""),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  foodType: z.enum(["veg", "non-veg", "vegan"]).default("veg"),
  basePrice: z.number().min(0, "Base price cannot be negative"),
  salePrice: z.number().min(0).optional().default(0),
  
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  images: z.array(z.string().url("Invalid image URL")).optional().default([]),
  
  sizes: z.array(sizeSchema).optional().default([]),
  addOns: z.array(addOnSchema).optional().default([]),
  
  stock: z.number().int().min(0).default(0),
  preparationTime: z.number().min(1).default(15),
  
  ingredients: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
}).refine(data => data.salePrice <= data.basePrice, {
  message: "Sale price cannot exceed base price",
  path: ["salePrice"]
});

export function validateProduct(data) {
  try {
    const validData = productSchema.parse(data);
    // sync legacy fields
    validData.isVeg = validData.foodType === "veg" || validData.foodType === "vegan";
    // Sync price for legacy cart compatibility
    validData.price = validData.basePrice; 
    
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          const key = err.path.join('.'); // Handle array paths like sizes.0.price
          fieldErrors[key] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, errors: { form: "Invalid product data" } };
  }
}
