"use client";

import { useCartStore } from "@/frontend/store/cartStore";
import { menuProducts } from "@/frontend/data/menuProducts";
import ProductCard from "@/frontend/components/menu/ProductCard";

export default function CartRecommendations() {
  const cartItems = useCartStore((state) => state.items);
  
  // Get up to 4 popular products that are NOT already in the cart
  const cartItemIds = new Set(cartItems.map(item => item.id));
  
  const recommendations = menuProducts
    .filter(product => product.isAvailable !== false && !cartItemIds.has(product.id))
    // Prefer popular items
    .sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
    .slice(0, 4);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100 mt-8">
      <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-6">
        You may also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
