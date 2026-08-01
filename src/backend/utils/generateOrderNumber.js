import crypto from "crypto";
import Order from "../models/Order";

export const generateOrderNumber = async () => {
  const prefix = "TZC";
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  
  let orderNumber;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 5;

  while (!isUnique && attempts < maxAttempts) {
    // Generate a 4-character random alphanumeric string (uppercase)
    const randomSuffix = crypto.randomBytes(2).toString("hex").toUpperCase();
    orderNumber = `${prefix}-${dateStr}-${randomSuffix}`;
    
    // Check for collision
    const existingOrder = await Order.findOne({ orderNumber }).lean();
    if (!existingOrder) {
      isUnique = true;
    }
    attempts++;
  }

  if (!isUnique) {
    throw new Error("Failed to generate a unique order number");
  }

  return orderNumber;
};
