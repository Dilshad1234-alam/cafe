"use client";

import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryToolbar({ onAddClick }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to page 1 on search
    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6">
      
      <form onSubmit={handleSearch} className="relative w-full sm:w-96 flex-shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
        />
        <button type="submit" className="hidden">Search</button>
      </form>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select 
            value={searchParams.get("status") || "all"}
            onChange={handleStatusChange}
            className="w-full sm:w-auto pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm font-medium text-gray-700 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button 
          onClick={onAddClick}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-charcoal hover:bg-gray-800 text-white rounded-xl font-bold transition-colors text-sm whitespace-nowrap shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

    </div>
  );
}
