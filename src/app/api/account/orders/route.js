import { getMyOrdersController } from "../../../../backend/controllers/orderController";
import connectToDatabase from "../../../../backend/config/db";

export async function GET(request) {
  await connectToDatabase();
  return getMyOrdersController(request);
}
