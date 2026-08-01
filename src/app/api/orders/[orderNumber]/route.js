import { getOrderController } from "../../../../backend/controllers/orderController";
import connectToDatabase from "../../../../backend/config/db";

export async function GET(request, context) {
  await connectToDatabase();
  return getOrderController(request, context);
}
