import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Utensils } from 'lucide-react';

export default function MyOrdersHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
      <div>
        <Link 
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-charcoal transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-charcoal mb-2">
          My Orders
        </h1>
        <p className="text-gray-500">
          View your recent orders and check their current status.
        </p>
      </div>
      <Link 
        href="/menu"
        className="px-6 py-3 bg-brand-yellow text-brand-charcoal rounded-xl font-bold hover:bg-[#E5A800] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/20 whitespace-nowrap self-start sm:self-auto"
      >
        <Utensils className="w-4 h-4" />
        Explore Menu
      </Link>
    </div>
  );
}
