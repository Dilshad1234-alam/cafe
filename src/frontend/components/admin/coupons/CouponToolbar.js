"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Plus } from 'lucide-react';
import { useDebounce } from '@/frontend/hooks/useDebounce';

export default function CouponToolbar({ totalCoupons }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(currentSearch);
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    const currentParamSearch = searchParams.get('search') || '';
    if (debouncedSearch === currentParamSearch) {
      return; 
    }

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-brand-charcoal">Coupons</h1>
        <p className="text-gray-500 font-medium mt-1">Manage {totalCoupons > 0 ? `${totalCoupons} ` : ''}discount codes</p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-72">
          <input 
            type="text" 
            placeholder="Search by code or description..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow font-medium transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        
        <Link 
          href="/admin/coupons/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Coupon</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>
    </div>
  );
}
