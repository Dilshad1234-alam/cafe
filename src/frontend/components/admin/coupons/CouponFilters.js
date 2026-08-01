"use client";

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CouponFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const status = searchParams.get('status') || 'all';
  const discountType = searchParams.get('discountType') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
      
      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
        <select 
          value={status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="expired">Expired</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Discount Type</label>
        <select 
          value={discountType}
          onChange={(e) => handleFilterChange('discountType', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Types</option>
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount (₹)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none ml-auto">
        <label className="text-xs font-bold text-gray-500 uppercase">Sort By</label>
        <select 
          value={sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="expiry-soon">Expiring Soon</option>
          <option value="code-asc">Code (A-Z)</option>
          <option value="code-desc">Code (Z-A)</option>
        </select>
      </div>
      
    </div>
  );
}
