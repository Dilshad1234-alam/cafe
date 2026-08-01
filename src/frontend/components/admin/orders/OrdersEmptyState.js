import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';

export default function OrdersEmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        {hasFilters ? (
          <Search className="w-10 h-10 text-gray-300" />
        ) : (
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {hasFilters ? "No orders found" : "No orders yet"}
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        {hasFilters 
          ? "We couldn't find any orders matching your current search and filters. Try adjusting them."
          : "When customers place orders, they will appear here."}
      </p>
      
      {hasFilters && (
        <button 
          onClick={onClearFilters}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
