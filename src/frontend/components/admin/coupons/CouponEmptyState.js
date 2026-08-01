import React from 'react';
import { Ticket, SearchX } from 'lucide-react';

export default function CouponEmptyState({ hasFilters, onClearFilters }) {
  if (hasFilters) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No coupons found</h3>
        <p className="text-gray-500 max-w-sm mb-6">
          We couldn't find any coupons matching your current search and filter criteria.
        </p>
        <button 
          onClick={onClearFilters}
          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center shadow-sm">
      <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-4">
        <Ticket className="w-8 h-8 text-brand-yellow" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No coupons yet</h3>
      <p className="text-gray-500 max-w-sm">
        Create your first discount code to start running promotions.
      </p>
    </div>
  );
}
