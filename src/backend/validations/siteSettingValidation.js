import { z } from "zod";

const emptyStringToUndefined = z.literal("").transform(() => undefined);
const optionalUrl = z.union([z.string().url(), z.literal(""), z.undefined(), z.null()]).transform(val => val === "" ? null : val);

export const siteSettingSchema = z.object({
  business: z.object({
    name: z.string().min(1, "Business name is required").max(100),
    shortName: z.string().max(50).optional().nullable(),
    description: z.string().max(500).optional().nullable(),
    phone: z.string().min(10, "Valid phone number is required").max(15),
    alternatePhone: z.string().max(15).optional().nullable(),
    email: z.union([z.string().email(), z.literal(""), z.undefined(), z.null()]).transform(val => val === "" ? null : val),
    addressLine: z.string().min(5, "Address line is required"),
    landmark: z.string().max(100).optional().nullable(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
    openingHours: z.string().min(1, "Opening time is required"),
    closingHours: z.string().min(1, "Closing time is required"),
    businessDays: z.array(z.string()).optional(),
  }),
  ordering: z.object({
    deliveryEnabled: z.boolean(),
    takeawayEnabled: z.boolean(),
    minimumOrderAmount: z.coerce.number().min(0),
    deliveryFee: z.coerce.number().min(0),
    freeDeliveryThreshold: z.coerce.number().min(0).nullable().optional(),
    taxPercentage: z.coerce.number().min(0).max(100),
    maximumItemQuantity: z.coerce.number().int().min(1).max(100),
    estimatedDeliveryMinutes: z.coerce.number().min(1),
    estimatedPickupMinutes: z.coerce.number().min(1),
  }).refine(data => data.deliveryEnabled || data.takeawayEnabled, {
    message: "At least one ordering method (Delivery or Takeaway) must be enabled",
    path: ["deliveryEnabled"],
  }),
  social: z.object({
    whatsappNumber: z.string().max(20).optional().nullable(),
    instagramUrl: optionalUrl,
    facebookUrl: optionalUrl,
    googleMapsUrl: optionalUrl,
  }),
  appearance: z.object({
    logoUrl: optionalUrl,
    faviconUrl: optionalUrl,
    announcementText: z.string().max(200).optional().nullable(),
    announcementEnabled: z.boolean().default(false),
    footerText: z.string().max(300).optional().nullable(),
  })
}).strict(); // Reject unsafe fields entirely
