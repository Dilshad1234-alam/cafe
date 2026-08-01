"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminCategories } from '@/frontend/services/admin/categoryService';
import { toast } from 'sonner';

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load categories for the filter dropdown
    fetchAdminCategories(new URLSearchParams({ limit: 100 }))
      .then(data => setCategories(data.categories))
      .catch(err => console.error("Failed to load categories for filter", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    else params.delete("search");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-4">
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <form onSubmit={handleSearch} className="relative w-full sm:w-96 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
          />
          <button type="submit" className="hidden">Search</button>
        </form>

        <Link 
          href="/admin/products/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-charcoal hover:bg-gray-800 text-white rounded-xl font-bold transition-colors text-sm whitespace-nowrap shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[140px]">
          <select 
            value={searchParams.get("category") || "all"}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm font-medium text-gray-700 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 min-w-[140px]">
          <select 
            value={searchParams.get("foodType") || "all"}
            onChange={(e) => handleFilterChange("foodType", e.target.value)}
            className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm font-medium text-gray-700 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div className="relative flex-1 min-w-[140px]">
          <select 
            value={searchParams.get("status") || "all"}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm font-medium text-gray-700 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Available</option>
            <option value="inactive">Unavailable</option>
          </select>
        </div>
      </div>

    </div>
  );
}
