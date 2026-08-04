import { NextResponse } from "next/server";
import { getInvoiceOrderData } from "@/backend/services/invoiceService";
import { getAuthenticatedUser } from "@/backend/middleware/auth";
import connectToDatabase from "@/backend/config/db";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    // params is a promise in Next 15, but assuming it's resolved here or awaited
    const { orderNumber } = params;
    
    const url = new URL(request.url);
    const guestToken = url.searchParams.get("guestToken");
    const user = await getAuthenticatedUser();

    const invoiceData = await getInvoiceOrderData(orderNumber, user, guestToken);

    return NextResponse.json({ success: true, data: invoiceData }, { status: 200 });
  } catch (error) {
    console.error("Invoice API Error:", error);
    if (error.message.includes("Not authorized")) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }
    if (error.message.includes("not found")) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: "Failed to generate invoice" }, { status: 500 });
  }
}
