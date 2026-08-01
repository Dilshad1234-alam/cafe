import crypto from "crypto";

/**
 * Generate a random token for guest access
 */
export const generateGuestOrderToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Hash a guest token for secure storage
 * @param {string} token 
 */
export const hashGuestOrderToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

/**
 * Verify a token against its stored hash
 * @param {string} token 
 * @param {string} storedHash 
 */
export const verifyGuestOrderToken = (token, storedHash) => {
  if (!token || !storedHash) return false;
  const hashToVerify = hashGuestOrderToken(token);
  return crypto.timingSafeEqual(Buffer.from(hashToVerify), Buffer.from(storedHash));
};
