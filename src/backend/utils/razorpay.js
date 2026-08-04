import "server-only";
import Razorpay from "razorpay";

let razorpayInstance = null;

export const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay configuration is missing on the server. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayInstance;
};
