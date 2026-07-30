import Image from "next/image";

export default function ProductGallery({ product, discount }) {
  // We can support multiple images later, for now we use the main image
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
      <Image 
        src={product.image}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        unoptimized
      />
      
      {/* Badges Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {product.foodType === "veg" ? (
          <div className="bg-white p-1.5 rounded shadow-md flex items-center justify-center" aria-label="Vegetarian">
            <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-1.5 rounded shadow-md flex items-center justify-center" aria-label="Non-Vegetarian">
            <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
            </div>
          </div>
        )}
        
        {product.isPopular && (
          <span className="px-3 py-1.5 bg-brand-charcoal text-brand-yellow text-sm font-bold rounded shadow-md">
            Bestseller
          </span>
        )}
      </div>

      {discount > 0 && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-brand-red text-white text-sm font-bold rounded shadow-md">
            {discount}% OFF
          </span>
        </div>
      )}
    </div>
  );
}
