"use client";

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useDebounce } from '@/frontend/hooks/useDebounce';

export default function AdminOrderToolbar({ totalOrders }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(currentSearch);
  const debouncedSearch = useDebounce(inputValue, 500);

  // Sync debounced search to URL
  React.useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (debouncedSearch === currentSearch) {
      return; // Prevent running on mount or when other params change
    }

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    // reset page on search
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-brand-charcoal">Orders</h1>
        <p className="text-gray-500 font-medium mt-1">Manage and track all customer orders</p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow font-medium transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
