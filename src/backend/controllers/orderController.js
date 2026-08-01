import { NextResponse } from "next/server";
import { createOrderSchema } from "../validations/orderValidation";
import { createOrder, getOrderByNumber, getCustomerOrders } from "../services/orderService";
import { verifyAuthToken } from "../utils/authToken";
import User from "../models/User";
import { AUTH_COOKIE_NAME } from "../config/authConfig";

export const createOrderController = async (request) => {
  try {
    const body = await request.json();

    // 1. Validation
    const parseResult = createOrderSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const orderData = parseResult.data;

    // 2. Auth Context
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    let authenticatedUser = null;
    
    if (token) {
      const decoded = verifyAuthToken(token);
      if (decoded && decoded.userId) {
        authenticatedUser = await User.findById(decoded.userId).lean();
      }
    }

    // 3. Create Order
    const { order, guestAccessToken } = await createOrder(orderData, authenticatedUser);

    // 4. Return safe response
    const responsePayload = {
      success: true,
      message: "Order placed successfully",
      order: {
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        pricing: order.pricing,
      }
    };

    if (guestAccessToken) {
      responsePayload.guestAccessToken = guestAccessToken;
    }

    return NextResponse.json(responsePayload, { status: 201 });
  } catch (error) {
    console.error("Order Creation Error:", error);
    
    // Provide safe error messages
    let statusCode = 500;
    let message = "Internal server error";
    
    if (error.message && (error.message.includes("not found") || error.message.includes("unavailable"))) {
      statusCode = 400;
      message = error.message;
    }

    return NextResponse.json(
      { success: false, message },
      { status: statusCode }
    );
  }
};

export const getOrderController = async (request, context) => {
  try {
    const { orderNumber } = await context.params;

    const url = new URL(request.url);
    const guestToken = url.searchParams.get("guestToken");

    // Extract user from token if available
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    let authenticatedUser = null;
    if (token) {
      const decoded = verifyAuthToken(token);
      if (decoded && decoded.userId) {
        authenticatedUser = await User.findById(decoded.userId).lean();
      }
    }

    const order = await getOrderByNumber(orderNumber, authenticatedUser, guestToken);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Strip sensitive info before returning
    const safeOrder = {
      orderNumber: order.orderNumber,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      customer: order.customer,
      orderType: order.orderType,
      deliveryAddress: order.deliveryAddress,
      items: order.items,
      pricing: order.pricing,
      notes: order.notes,
      createdAt: order.createdAt,
    };

    return NextResponse.json({ success: true, order: safeOrder }, { status: 200 });
  } catch (error) {
    if (error.message.includes("Access denied")) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 403 }
      );
    }
    console.error("Get Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getMyOrdersController = async (request) => {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyAuthToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const authenticatedUser = await User.findById(decoded.userId).lean();
    if (!authenticatedUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const data = await getCustomerOrders(authenticatedUser, page, limit);

    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    if (error.message === "Authentication required") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    console.error("Get My Orders Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
