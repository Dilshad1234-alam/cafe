import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Tag } from 'lucide-react';

export default function OrdersEmptyState({ filterActive = false }) {
  if (filterActive) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="font-serif text-2xl font-black text-brand-charcoal mb-2">
          No orders found for this filter
        </h2>
        <Link 
          href="/account/orders"
          className="mt-6 text-brand-charcoal font-bold underline hover:text-brand-yellow transition-colors"
        >
          Show All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
      <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8 border-8 border-gray-100">
        <ShoppingBag className="w-12 h-12 text-gray-300" />
      </div>
      
      <h2 className="font-serif text-3xl md:text-4xl font-black text-brand-charcoal mb-4">
        No orders yet
      </h2>
      
      <p className="text-lg text-gray-500 max-w-md mx-auto mb-10">
        Your completed orders will appear here after you place your first order.
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
