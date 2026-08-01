"use client";

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function AdminOrderFilters() {
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
    params.delete('page'); // Reset pagination
    router.push(`${pathname}?${params.toString()}`);
  };

  const status = searchParams.get('status') || 'all';
  const paymentStatus = searchParams.get('paymentStatus') || 'all';
  const orderType = searchParams.get('orderType') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
      
      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Order Status</label>
        <select 
          value={status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Payment Status</label>
        <select 
          value={paymentStatus}
          onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Order Type</label>
        <select 
          value={orderType}
          onChange={(e) => handleFilterChange('orderType', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Types</option>
          <option value="delivery">Delivery</option>
          <option value="takeaway">Takeaway</option>
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
          <option value="totalHigh">Total: High to Low</option>
          <option value="totalLow">Total: Low to High</option>
        </select>
      </div>
      
    </div>
  );
}
