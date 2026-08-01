"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/frontend/store/cartStore";

export default function CartEmptyState() {
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  if (totalQuantity > 0) return null;

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border border-gray-100 shadow-sm px-4">
      
      <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8 border-8 border-gray-100">
        <ShoppingCart className="w-12 h-12 text-gray-300" />
      </div>
      
      <h2 className="font-serif text-3xl md:text-4xl font-black text-brand-charcoal mb-4">
        Your cart is empty
      </h2>
      
      <p className="text-lg text-gray-500 max-w-md mx-auto mb-10">
        Add your favourite burgers, pizzas, momos and cafe treats.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/menu"
          className="px-8 py-4 bg-brand-yellow text-brand-charcoal rounded-xl font-bold hover:bg-[#E5A800] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/20"
        >
          Explore Menu
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link 
          href="/offers"
          className="px-8 py-4 bg-white border border-gray-200 text-brand-charcoal rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Tag className="w-5 h-5" />
          View Offers
        </Link>
      </div>
      
    </div>
  );
}
