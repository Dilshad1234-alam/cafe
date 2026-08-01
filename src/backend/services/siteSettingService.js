import "server-only";
import SiteSetting from "../models/SiteSetting";
import { siteConfig } from "@/frontend/data/siteConfig";

const SINGLETON_KEY = "main";

/**
 * Creates the singleton document if it doesn't exist.
 */
async function getOrCreateSettings() {
  let settings = await SiteSetting.findOne({ key: SINGLETON_KEY });
  if (!settings) {
    // Bootstrap from siteConfig
    settings = await SiteSetting.create({
      key: SINGLETON_KEY,
      business: {
        name: siteConfig.name || "The Tasty Zone",
        shortName: siteConfig.shortName || "Tasty Zone",
        description: siteConfig.description || "Fresh Taste. Happy Moments.",
        phone: siteConfig.phone?.replace(/[^0-9+]/g, '') || "+918208735776",
        addressLine: siteConfig.address || "Shankar Chowk, Sindhi Colony, Gondia",
        city: "Gondia",
        state: "Maharashtra",
        pincode: "441614", // default valid pincode
        openingHours: "12:00",
        closingHours: "00:00",
        businessDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      },
      ordering: {
        deliveryEnabled: true,
        takeawayEnabled: true,
        minimumOrderAmount: 0,
        deliveryFee: 0,
        freeDeliveryThreshold: 499,
        taxPercentage: 0,
        maximumItemQuantity: 10,
        estimatedDeliveryMinutes: 45,
        estimatedPickupMinutes: 20,
      },
      social: {
        whatsappNumber: siteConfig.whatsapp || "918208735776",
        instagramUrl: siteConfig.links?.instagram || "",
        facebookUrl: siteConfig.links?.facebook || "",
        googleMapsUrl: siteConfig.links?.googleMaps || "",
      },
      appearance: {
        announcementEnabled: false,
        announcementText: siteConfig.deliveryText || "",
      }
    });
  }
  return settings;
}

export async function getAdminSiteSettings() {
  const settings = await getOrCreateSettings();
  return settings.toObject();
}

export async function updateAdminSiteSettings(data) {
  // Use runValidators to ensure mongoose validation also passes alongside Zod
  const updated = await SiteSetting.findOneAndUpdate(
    { key: SINGLETON_KEY },
    { $set: data },
    { new: true, runValidators: true, upsert: true } // upsert just in case it was somehow deleted
  );
  return updated.toObject();
}

export async function getPublicSiteSettings() {
  const settings = await getOrCreateSettings();
  const obj = settings.toObject();

  // Return ONLY public safe fields.
  return {
    business: {
      name: obj.business.name,
      shortName: obj.business.shortName,
      description: obj.business.description,
      phone: obj.business.phone,
      alternatePhone: obj.business.alternatePhone,
      email: obj.business.email,
      addressLine: obj.business.addressLine,
      landmark: obj.business.landmark,
      city: obj.business.city,
      state: obj.business.state,
      pincode: obj.business.pincode,
      openingHours: obj.business.openingHours,
      closingHours: obj.business.closingHours,
      businessDays: obj.business.businessDays,
    },
    ordering: {
      deliveryEnabled: obj.ordering.deliveryEnabled,
      takeawayEnabled: obj.ordering.takeawayEnabled,
      minimumOrderAmount: obj.ordering.minimumOrderAmount,
      deliveryFee: obj.ordering.deliveryFee,
      freeDeliveryThreshold: obj.ordering.freeDeliveryThreshold,
      taxPercentage: obj.ordering.taxPercentage,
      maximumItemQuantity: obj.ordering.maximumItemQuantity,
      estimatedDeliveryMinutes: obj.ordering.estimatedDeliveryMinutes,
      estimatedPickupMinutes: obj.ordering.estimatedPickupMinutes,
    },
    social: {
      whatsappNumber: obj.social.whatsappNumber,
      instagramUrl: obj.social.instagramUrl,
      facebookUrl: obj.social.facebookUrl,
      googleMapsUrl: obj.social.googleMapsUrl,
    },
    appearance: {
      logoUrl: obj.appearance.logoUrl,
      faviconUrl: obj.appearance.faviconUrl,
      announcementText: obj.appearance.announcementText,
      announcementEnabled: obj.appearance.announcementEnabled,
      footerText: obj.appearance.footerText,
    }
  };
}
