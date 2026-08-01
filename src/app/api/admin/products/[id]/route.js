import { requireAdminUser } from "@/backend/middleware/auth";
import connectToDatabase from "@/backend/config/db";
import { getAdminProductController, updateProductController, deleteProductController } from "@/backend/controllers/productController";

export async function GET(request, context) {
  try {
    await requireAdminUser();
    await connectToDatabase();
    return getAdminProductController(request, context);
  } catch (error) {
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}

export async function PUT(request, context) {
  try {
    await requireAdminUser();
    await connectToDatabase();
    return updateProductController(request, context);
  } catch (error) {
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    await requireAdminUser();
    await connectToDatabase();
    return deleteProductController(request, context);
  } catch (error) {
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
