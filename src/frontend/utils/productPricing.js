/**
 * productPricing.js
 * 
 * Utility functions for calculating product prices based on sizes and add-ons.
 * 
 * IMPORTANT:
 * These client-side calculations are for display and initial cart state only.
 * When a backend checkout API is implemented, ALL pricing MUST be recalculated 
 * securely on the server using the canonical database prices to prevent tampering.
 */

/**
 * Generates a stable, deterministic cart item key based on product configuration.
 * Sorting add-ons ensures selection order doesn't create duplicate cart entries.
 * 
 * @param {string} productId 
 * @param {string} sizeId 
 * @param {Array<string>} addOnIds 
 * @returns {string}
 */
export const generateItemKey = (productId, sizeId = null, addOnIds = []) => {
  const parts = [productId];
  if (sizeId) {
    parts.push(`sz:${sizeId}`);
  }
  if (addOnIds && addOnIds.length > 0) {
    const sortedAddOns = [...addOnIds].sort();
    parts.push(`add:${sortedAddOns.join(',')}`);
  }
  return parts.join('|');
};

/**
 * Calculates the final unit price of a configured product.
 * Uses Option A: sizes[].price represents the FULL unit price (not an increment over base).
 * If no size is selected, falls back to the product's salePrice or originalPrice.
 * 
 * @param {Object} product - The product object
 * @param {Object} selectedSize - The selected size object (if any)
 * @param {Array<Object>} selectedAddOns - Array of selected add-on objects
 * @returns {number}
 */
export const calculateConfiguredUnitPrice = (product, selectedSize, selectedAddOns = []) => {
  if (!product) return 0;
  
  // Base price logic: 
  // If a size is selected, its price is the base price.
  // Otherwise, use the product's sale price (if exists) or original price.
  let basePrice = 0;
  if (selectedSize && typeof selectedSize.price === 'number') {
    basePrice = selectedSize.price;
  } else {
    basePrice = product.salePrice || product.originalPrice;
  }

  // Add-ons total
  const addOnsTotal = selectedAddOns.reduce((total, addOn) => total + (addOn.price || 0), 0);

  return basePrice + addOnsTotal;
};

/**
 * Calculates the discount percentage between an original price and a sale price.
 * Returns 0 if invalid or if sale price is higher.
 * 
 * @param {number} originalPrice 
 * @param {number} salePrice 
 * @returns {number}
 */
export const getDiscountPercentage = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Calculates the total price for a cart item (unit price * quantity).
 * 
 * @param {number} configuredUnitPrice 
 * @param {number} quantity 
 * @returns {number}
 */
export const calculateItemTotal = (configuredUnitPrice, quantity) => {
  if (quantity < 0) return 0;
  return configuredUnitPrice * quantity;
};
