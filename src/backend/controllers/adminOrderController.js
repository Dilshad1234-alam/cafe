import { NextResponse } from "next/server";
import { updateOrderStatusSchema, updatePaymentStatusSchema } from "../validations/adminOrderValidation";
import { listAdminOrders, getAdminOrderDetails, updateOrderStatus, updatePaymentStatus } from "../services/adminOrderService";

export const listAdminOrdersController = async (request) => {
  try {
    const url = new URL(request.url);
    const query = {
      search: url.searchParams.get("search") || "",
      status: url.searchParams.get("status") || "all",
      paymentStatus: url.searchParams.get("paymentStatus") || "all",
      paymentMethod: url.searchParams.get("paymentMethod") || "all",
      orderType: url.searchParams.get("orderType") || "all",
      page: parseInt(url.searchParams.get("page") || "1", 10),
      limit: parseInt(url.searchParams.get("limit") || "10", 10),
      sort: url.searchParams.get("sort") || "newest",
    };

    const data = await listAdminOrders(query);

    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("List Admin Orders Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getAdminOrderDetailsController = async (request, context) => {
  try {
    const { orderNumber } = await context.params;

    const order = await getAdminOrderDetails(orderNumber);

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Get Admin Order Details Error:", error);
    if (error.message === "Order not found") {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updateOrderStatusController = async (request, context, adminUser) => {
  try {
    const { orderNumber } = await context.params;
    const body = await request.json();

    const parseResult = updateOrderStatusSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { status, note } = parseResult.data;

    const updatedOrder = await updateOrderStatus(orderNumber, status, note, adminUser);

    return NextResponse.json({ 
      success: true, 
      message: "Order status updated successfully", 
      order: updatedOrder 
    }, { status: 200 });

  } catch (error) {
    console.error("Update Order Status Error:", error);
    if (error.message.includes("Invalid status transition") || error.message.includes("Cannot") || error.message.includes("Cancellation reason")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    if (error.message === "Order not found") {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updatePaymentStatusController = async (request, context, adminUser) => {
  try {
    const { orderNumber } = await context.params;
    const body = await request.json();

    const parseResult = updatePaymentStatusSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { paymentStatus } = parseResult.data;

    const updatedOrder = await updatePaymentStatus(orderNumber, paymentStatus, adminUser);

    return NextResponse.json({ 
      success: true, 
      message: "Payment status updated successfully", 
      order: updatedOrder 
    }, { status: 200 });

  } catch (error) {
    console.error("Update Payment Status Error:", error);
    if (error.message.includes("Cannot")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    if (error.message === "Order not found") {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
