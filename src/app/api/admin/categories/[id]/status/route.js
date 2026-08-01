import { requireAdminUser } from "@/backend/middleware/auth";
import connectToDatabase from "@/backend/config/db";
import { updateCategoryStatusController } from "@/backend/controllers/categoryController";

export async function PATCH(request, context) {
  try {
    await requireAdminUser();
    await connectToDatabase();
    return updateCategoryStatusController(request, context);
  } catch (error) {
    if (error.message === "Forbidden" || error.message === "Authentication required") {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
