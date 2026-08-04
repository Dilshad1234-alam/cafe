import { getPaymentSummaryController } from "@/backend/controllers/adminPaymentController";
import connectToDatabase from "@/backend/config/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  await connectToDatabase();
  return getPaymentSummaryController(request);
}
