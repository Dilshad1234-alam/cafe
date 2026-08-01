import { NextResponse } from "next/server";
import { 
  createCouponSchema, 
  updateCouponSchema, 
  updateCouponStatusSchema 
} from "../validations/couponValidation";
import { 
  listAdminCoupons, 
  getAdminCouponById, 
  createCoupon, 
  updateCoupon, 
  updateCouponStatus, 
  deleteCoupon 
} from "../services/couponService";

export const listAdminCouponsController = async (request) => {
  try {
    const url = new URL(request.url);
    const query = {
      search: url.searchParams.get("search") || "",
      status: url.searchParams.get("status") || "all",
      discountType: url.searchParams.get("discountType") || "all",
      page: parseInt(url.searchParams.get("page") || "1", 10),
      limit: parseInt(url.searchParams.get("limit") || "10", 10),
      sort: url.searchParams.get("sort") || "newest",
    };

    const data = await listAdminCoupons(query);

    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("List Admin Coupons Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getAdminCouponController = async (request, context) => {
  try {
    const { id } = await context.params;

    const data = await getAdminCouponById(id);

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Get Admin Coupon Error:", error);
    if (error.message === "Invalid coupon ID" || error.message === "Coupon not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const createCouponController = async (request) => {
  try {
    const body = await request.json();

    const parseResult = createCouponSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const newCoupon = await createCoupon(parseResult.data);

    return NextResponse.json({ 
      success: true, 
      message: "Coupon created successfully", 
      coupon: newCoupon 
    }, { status: 201 });

  } catch (error) {
    console.error("Create Coupon Error:", error);
    if (error.message === "A coupon with this code already exists") {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updateCouponController = async (request, context) => {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parseResult = updateCouponSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const updatedCoupon = await updateCoupon(id, parseResult.data);

    return NextResponse.json({ 
      success: true, 
      message: "Coupon updated successfully", 
      coupon: updatedCoupon 
    }, { status: 200 });

  } catch (error) {
    console.error("Update Coupon Error:", error);
    if (error.message === "Invalid coupon ID" || error.message === "Coupon not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    if (error.message === "A coupon with this code already exists") {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updateCouponStatusController = async (request, context) => {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parseResult = updateCouponStatusSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { isActive } = parseResult.data;
    const updatedCoupon = await updateCouponStatus(id, isActive);

    return NextResponse.json({ 
      success: true, 
      message: "Coupon status updated successfully", 
      coupon: updatedCoupon 
    }, { status: 200 });

  } catch (error) {
    console.error("Update Coupon Status Error:", error);
    if (error.message === "Invalid coupon ID" || error.message === "Coupon not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const deleteCouponController = async (request, context) => {
  try {
    const { id } = await context.params;

    await deleteCoupon(id);

    return NextResponse.json({ 
      success: true, 
      message: "Coupon deleted successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Delete Coupon Error:", error);
    if (error.message === "Invalid coupon ID" || error.message === "Coupon not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    if (error.message === "This coupon has already been used. Deactivate it instead.") {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
