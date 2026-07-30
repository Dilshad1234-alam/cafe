import ProductCard from "@/frontend/components/menu/ProductCard";

export default function RelatedProducts({ relatedProducts }) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl font-bold text-brand-charcoal">
          You might also like
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
