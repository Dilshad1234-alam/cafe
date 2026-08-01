import { NextResponse } from "next/server";
import { updateCustomerStatusSchema } from "../validations/adminCustomerValidation";
import { listAdminCustomers, getAdminCustomerDetails, updateCustomerStatus } from "../services/adminCustomerService";

export const listAdminCustomersController = async (request) => {
  try {
    const url = new URL(request.url);
    const query = {
      search: url.searchParams.get("search") || "",
      status: url.searchParams.get("status") || "all",
      role: url.searchParams.get("role") || "all",
      page: parseInt(url.searchParams.get("page") || "1", 10),
      limit: parseInt(url.searchParams.get("limit") || "10", 10),
      sort: url.searchParams.get("sort") || "newest",
    };

    const data = await listAdminCustomers(query);

    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("List Admin Customers Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getAdminCustomerDetailsController = async (request, context) => {
  try {
    const { id } = await context.params;

    const data = await getAdminCustomerDetails(id);

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Get Admin Customer Details Error:", error);
    if (error.message === "Invalid customer ID" || error.message === "Customer not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updateCustomerStatusController = async (request, context, adminUser) => {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parseResult = updateCustomerStatusSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { isActive } = parseResult.data;
    const currentAdminId = adminUser?._id?.toString() || adminUser?.id;

    const updatedCustomer = await updateCustomerStatus(id, isActive, currentAdminId);

    return NextResponse.json({ 
      success: true, 
      message: "Customer status updated successfully", 
      customer: updatedCustomer 
    }, { status: 200 });

  } catch (error) {
    console.error("Update Customer Status Error:", error);
    if (error.message === "Invalid customer ID" || error.message === "Customer not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    if (error.message === "Cannot change your own account status") {
      return NextResponse.json({ success: false, message: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
