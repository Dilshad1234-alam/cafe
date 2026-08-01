"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function CheckoutEmptyState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8 border-8 border-gray-100">
        <ShoppingBag className="w-12 h-12 text-gray-300" />
      </div>
      
      <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-charcoal mb-4">
        Your cart is empty
      </h1>
      
      <p className="text-lg text-gray-500 max-w-md mx-auto mb-10">
        Add some delicious items before continuing to checkout.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/menu"
          className="px-8 py-4 bg-brand-yellow text-brand-charcoal rounded-xl font-bold hover:bg-[#E5A800] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/20"
        >
          Explore Menu
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
