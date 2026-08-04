"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';

export default function PaymentFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters('search', search);
  };

  const clearFilters = () => {
    setSearch('');
    router.push(pathname);
  };

  const method = searchParams.get('method') || 'all';
  const status = searchParams.get('paymentStatus') || 'all';
  const dateRange = searchParams.get('dateRange') || 'all';

  const hasActiveFilters = search || method !== 'all' || status !== 'all' || dateRange !== 'all';

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Order ID, Payment ID, Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all"
          />
        </form>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={method}
            onChange={(e) => updateFilters('method', e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 cursor-pointer min-w-[140px]"
          >
            <option value="all">All Methods</option>
            <option value="razorpay">Razorpay / Online</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="pay_at_pickup">Pay at Pickup</option>
          </select>

          <select
            value={status}
            onChange={(e) => updateFilters('paymentStatus', e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 cursor-pointer min-w-[140px]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => updateFilters('dateRange', e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 cursor-pointer min-w-[140px]"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors font-medium"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
