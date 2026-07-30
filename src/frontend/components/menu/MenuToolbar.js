"use client";

import { useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import MenuSort from "./MenuSort";

export default function MenuToolbar({ totalResults }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const currentCategory = searchParams.get("category") || "all";
  const hasFilters = Array.from(searchParams.keys()).some(k => k !== 'category' && k !== 'sort');

  const handleClearFilters = () => {
    // Keep category and sort, clear everything else
    const params = new URLSearchParams(searchParams.toString());
    const cat = params.get("category");
    const sort = params.get("sort");
    
    // Create fresh params
    const newParams = new URLSearchParams();
    if (cat) newParams.set("category", cat);
    if (sort) newParams.set("sort", sort);
    
    startTransition(() => {
      router.push(`/menu?${newParams.toString()}`, { scroll: false });
    });
  };

  const categoryNameDisplay = currentCategory === "all" ? "All Items" : 
    currentCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-gray-100 mb-6">
      
      <div className="flex items-center gap-3">
        <h2 className="text-gray-600 font-medium">
          Showing <span className="font-bold text-brand-charcoal">{totalResults}</span> items in <span className="text-brand-charcoal font-semibold">{categoryNameDisplay}</span>
        </h2>
        
        {hasFilters && (
          <button 
            onClick={handleClearFilters}
            className="hidden md:flex items-center gap-1 text-xs font-semibold text-brand-red bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition-colors"
          >
            <X className="w-3 h-3" /> Clear Filters
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* Mobile filter button gets rendered in the page layout next to this, or we can just keep MenuSort here */}
        <MenuSort />
      </div>

    </div>
  );
}
