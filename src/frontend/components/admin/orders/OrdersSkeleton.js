import React from 'react';

export default function OrdersSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="hidden lg:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
        <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="col-span-1 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="col-span-1 h-4 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="divide-y divide-gray-100">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
            {/* Mobile Layout Skeleton */}
            <div className="lg:hidden flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="w-1/3 h-5 bg-gray-200 rounded animate-pulse" />
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-full h-8 bg-gray-200 rounded animate-pulse mt-2" />
            </div>

            {/* Desktop Layout Skeleton */}
            <div className="hidden lg:block lg:col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="hidden lg:block lg:col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="hidden lg:block lg:col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="hidden lg:block lg:col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="hidden lg:block lg:col-span-1 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="hidden lg:block lg:col-span-2 h-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="hidden lg:block lg:col-span-1 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
