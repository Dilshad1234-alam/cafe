import { getAdminPaymentDetailsController } from "@/backend/controllers/adminPaymentController";
import connectToDatabase from "@/backend/config/db";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  await connectToDatabase();
  return getAdminPaymentDetailsController(request, { params });
}
