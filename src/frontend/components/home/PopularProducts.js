import { popularProducts } from "@/frontend/data/popularProducts";
import ProductCard from "@/frontend/components/menu/ProductCard";

export default function PopularProducts() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-charcoal mb-4">Our Popular Dishes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked favorites from our menu that our customers can't get enough of.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {popularProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
