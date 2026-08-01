import { createOrderController } from "../../../backend/controllers/orderController";
import connectToDatabase from "../../../backend/config/db";

export async function POST(request) {
  await connectToDatabase();
  return createOrderController(request);
}
