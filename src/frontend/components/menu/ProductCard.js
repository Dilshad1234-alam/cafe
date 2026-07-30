"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star, Info, Clock } from "lucide-react";
import { useCartStore } from "@/frontend/store/cartStore";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Determine default config
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    
    addItem(product, 1, {
      selectedSize: defaultSize,
      selectedAddOns: [], // default no add-ons
      configuredUnitPrice: product.salePrice || product.originalPrice // handled in cartStore logic, but we pass default
    });
    
    toast.success(`${product.name} added to cart!`);
  };

  const discount = product.originalPrice && product.salePrice 
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.foodType === "veg" ? (
            <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center" aria-label="Vegetarian">
              <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center" aria-label="Non-Vegetarian">
              <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
              </div>
            </div>
          )}
          
          {product.isPopular && (
            <span className="px-2 py-1 bg-brand-charcoal text-brand-yellow text-xs font-bold rounded shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {discount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-brand-red text-white text-xs font-bold rounded shadow-sm">
              {discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/menu/product/${product.slug}`} className="hover:text-brand-yellow transition-colors line-clamp-1">
            <h3 className="font-bold text-brand-charcoal text-lg leading-tight">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1 bg-brand-yellow/10 px-1.5 py-0.5 rounded text-sm shrink-0">
            <Star className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
            <span className="font-bold text-brand-charcoal">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            {product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-brand-charcoal">₹{product.salePrice}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              </div>
            ) : (
              <span className="font-bold text-xl text-brand-charcoal">₹{product.originalPrice}</span>
            )}
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {product.preparationTime}
            </span>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center hover:bg-[#E5A800] transition-colors shadow-md active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
