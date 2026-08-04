import "server-only";
import crypto from "crypto";

/**
 * Safely verifies a Razorpay webhook or payment signature using Node's crypto
 */
export const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!secret) {
      console.error("RAZORPAY_KEY_SECRET is missing from environment variables.");
      return false;
    }

    const payload = `${orderId}|${paymentId}`;
    
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    // Use timingSafeEqual to prevent timing attacks
    const expectedBuffer = Buffer.from(generatedSignature, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (error) {
    console.error("Signature verification error:", error);
    return false; // Fail securely
  }
};
