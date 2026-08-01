"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetchAdminProducts } from '@/frontend/services/admin/productService';

export default function ReviewFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const query = new URLSearchParams();
        query.set('limit', '100');
        const res = await fetchAdminProducts(query);
        setProducts(res.products || []);
      } catch (error) {
        console.error("Failed to load products for filter", error);
      }
    }
    loadProducts();
  }, []);

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
  const rating = searchParams.get('rating') || 'all';
  const product = searchParams.get('product') || 'all';
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
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Rating</label>
        <select 
          value={rating}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>
      
      <div className="flex flex-col gap-1.5 min-w-[160px] flex-1 sm:flex-none">
        <label className="text-xs font-bold text-gray-500 uppercase">Product</label>
        <select 
          value={product}
          onChange={(e) => handleFilterChange('product', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
        >
          <option value="all">All Products</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
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
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
        </select>
      </div>
      
    </div>
  );
}
