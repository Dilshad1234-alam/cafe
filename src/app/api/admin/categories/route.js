import { requireAdminUser } from "@/backend/middleware/auth";
import connectToDatabase from "@/backend/config/db";
import { listAdminCategoriesController, createCategoryController } from "@/backend/controllers/categoryController";

export async function GET(request) {
  try {
    await requireAdminUser();
    await connectToDatabase();
    return listAdminCategoriesController(request);
  } catch (error) {
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    await requireAdminUser();
    await connectToDatabase();
    return createCategoryController(request);
  } catch (error) {
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
