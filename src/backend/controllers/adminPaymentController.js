import "server-only";
import { NextResponse } from "next/server";
import { getAdminPaymentSummary, listAdminPayments, getAdminPaymentDetails } from "../services/adminPaymentService";
import { requireAdminUser } from "../middleware/auth";

export const getPaymentSummaryController = async (request) => {
  try {
    await requireAdminUser(request);
    const summary = await getAdminPaymentSummary();
    return NextResponse.json({ success: true, data: summary }, { status: 200 });
  } catch (error) {
    console.error("getPaymentSummaryController Error:", error);
    if (error.message.includes("authorized") || error.message.includes("Forbidden") || error.message.includes("Authentication required")) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }
    return NextResponse.json({ success: false, message: "Failed to fetch payment summary" }, { status: 500 });
  }
};

export const listAdminPaymentsController = async (request) => {
  try {
    await requireAdminUser(request);
    const url = new URL(request.url);
    
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const sort = url.searchParams.get("sort") || "newest";
    
    const filters = {
      search: url.searchParams.get("search") || "",
      method: url.searchParams.get("method") || "all",
      paymentStatus: url.searchParams.get("paymentStatus") || "all",
      orderStatus: url.searchParams.get("orderStatus") || "all",
      dateRange: url.searchParams.get("dateRange") || "all",
    };

    const data = await listAdminPayments(filters, page, limit, sort);
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("listAdminPaymentsController Error:", error);
    if (error.message.includes("authorized") || error.message.includes("Forbidden") || error.message.includes("Authentication required")) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }
    return NextResponse.json({ success: false, message: "Failed to fetch payments" }, { status: 500 });
  }
};

export const getAdminPaymentDetailsController = async (request, { params }) => {
  try {
    await requireAdminUser(request);
    const { id } = await params; // Next 15+ compatible

    const payment = await getAdminPaymentDetails(id);
    return NextResponse.json({ success: true, data: payment }, { status: 200 });
  } catch (error) {
    console.error("getAdminPaymentDetailsController Error:", error);
    if (error.message.includes("authorized") || error.message.includes("Forbidden") || error.message.includes("Authentication required")) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }
    if (error.message.includes("not found")) {
      return NextResponse.json({ success: false, message: "Payment not found" }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: "Failed to fetch payment details" }, { status: 500 });
  }
};
