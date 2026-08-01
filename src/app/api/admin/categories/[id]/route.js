import { requireAdminUser } from "@/backend/middleware/auth";
import connectToDatabase from "@/backend/config/db";
import { getAdminCategoryController, updateCategoryController, deleteCategoryController } from "@/backend/controllers/categoryController";

export async function GET(request, context) {
  try {
    await requireAdminUser();
    await connectToDatabase();
    return getAdminCategoryController(request, context);
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
    return updateCategoryController(request, context);
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
    return deleteCategoryController(request, context);
  } catch (error) {
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
