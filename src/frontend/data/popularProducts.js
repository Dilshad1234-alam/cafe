import { menuProducts } from "./menuProducts";

// Export the filtered popular products to maintain backward compatibility 
// with the Home Page's PopularProducts component.
export const popularProducts = menuProducts.filter(product => product.isPopular);
