import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function OrdersSkeleton({ error, onRetry }) {
  if (error) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-red-100 shadow-sm px-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="font-serif text-2xl font-black text-brand-charcoal mb-2">
          Failed to load orders
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          {error}
        </p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-6 py-3 bg-white border border-gray-200 text-brand-charcoal rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        )}
      </div>
    );
  }

  // Skeleton Loading State
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4 w-full max-w-md">
            <div className="flex gap-4">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-4 bg-gray-100 rounded w-48"></div>
            <div className="h-4 bg-gray-100 rounded w-64"></div>
          </div>
          <div className="flex flex-col gap-4 md:items-end w-full md:w-auto">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-100 rounded-xl w-full md:w-32 mt-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
