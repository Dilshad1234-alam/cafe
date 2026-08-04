import { createRazorpayOrderController } from "../../../../../backend/controllers/razorpayPaymentController";
import connectToDatabase from "../../../../../backend/config/db";

export const dynamic = "force-dynamic";

export async function POST(request) {
  await connectToDatabase();
  return createRazorpayOrderController(request);
}
