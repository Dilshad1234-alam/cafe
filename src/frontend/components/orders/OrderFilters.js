"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OrderFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentStatus = searchParams.get('status') || 'all';

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'active', label: 'Active' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const handleFilterChange = (statusId) => {
    const params = new URLSearchParams(searchParams.toString());
    if (statusId === 'all') {
      params.delete('status');
    } else {
      params.set('status', statusId);
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/account/orders?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-gray-100 pb-4">
      {filters.map((filter) => {
        const isActive = currentStatus === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              isActive
                ? 'bg-brand-charcoal text-white shadow-md'
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
