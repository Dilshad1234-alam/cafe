import { NextResponse } from "next/server";
import { siteSettingSchema } from "../validations/siteSettingValidation";
import { 
  getAdminSiteSettings, 
  updateAdminSiteSettings, 
  getPublicSiteSettings 
} from "../services/siteSettingService";

export const getAdminSiteSettingsController = async (request) => {
  try {
    const data = await getAdminSiteSettings();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Get Admin Site Settings Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updateAdminSiteSettingsController = async (request) => {
  try {
    const body = await request.json();

    const parseResult = siteSettingSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const updatedData = await updateAdminSiteSettings(parseResult.data);

    return NextResponse.json({ 
      success: true, 
      message: "Settings updated successfully", 
      data: updatedData 
    }, { status: 200 });

  } catch (error) {
    console.error("Update Admin Site Settings Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getPublicSiteSettingsController = async (request) => {
  try {
    const data = await getPublicSiteSettings();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Get Public Site Settings Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
