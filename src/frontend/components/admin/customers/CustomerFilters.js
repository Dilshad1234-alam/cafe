"use client";

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CustomerFilters() {
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
  const role = searchParams.get('role') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
      
      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Account Status</label>
        <select 
          value={status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">User Role</label>
        <select 
          value={role}
          onChange={(e) => handleFilterChange('role', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Roles</option>
          <option value="user">Customer (User)</option>
          <option value="admin">Administrator</option>
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
          <option value="nameAsc">Name (A-Z)</option>
          <option value="spendingHigh">Highest Spending</option>
          <option value="ordersHigh">Most Orders</option>
        </select>
      </div>
      
    </div>
  );
}
