"use client";

import React from 'react';

export default function PaymentsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden lg:block">
        <div className="px-6 py-4 border-b border-gray-100 flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-6 py-6 border-b border-gray-50 flex gap-4">
            <div className="h-4 bg-gray-100 rounded w-1/6"></div>
            <div className="h-4 bg-gray-100 rounded w-1/6"></div>
            <div className="h-4 bg-gray-100 rounded w-1/6"></div>
            <div className="h-4 bg-gray-100 rounded w-1/6"></div>
            <div className="h-4 bg-gray-100 rounded w-1/6"></div>
          </div>
        ))}
      </div>

      <div className="lg:hidden space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between mb-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
