"use client";

import React from 'react';
import { CreditCard, X } from 'lucide-react';

export default function PaymentsEmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <CreditCard className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {hasFilters ? 'No payments match your filters' : 'No payments found'}
      </h3>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        {hasFilters 
          ? 'Try adjusting your search or filters to find what you are looking for.'
          : 'When customers place orders, their payment history will appear here.'}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
          Clear All Filters
        </button>
      )}
    </div>
  );
}
