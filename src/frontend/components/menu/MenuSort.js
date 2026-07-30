"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function MenuSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "recommended";
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    
    startTransition(() => {
      router.push(`/menu?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-select" className="sr-only">Sort by</label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleSortChange}
        className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium hover:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors cursor-pointer"
      >
        <option value="recommended">Recommended</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Top Rated</option>
        <option value="popular">Most Popular</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
