"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/frontend/hooks/useDebounce";

export default function MenuSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  
  const [inputValue, setInputValue] = useState(currentSearch);
  const debouncedSearch = useDebounce(inputValue, 400); // 400ms debounce
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);
  }, []);

  // Sync with URL changes from other sources (e.g., clear all filters)
  // Only sync if currentSearch is cleared to prevent cursor jumping while typing
  useEffect(() => {
    if (currentSearch === "" && inputValue !== "") {
      setInputValue("");
    }
  }, [currentSearch]);

  // Push to URL when debounced search changes
  useEffect(() => {
    if (!isMounted) return;
    
    const params = new URLSearchParams(searchParams.toString());
    const trimmedQuery = debouncedSearch.trim();
    
    if (trimmedQuery) {
      params.set("search", trimmedQuery);
    } else {
      params.delete("search");
    }
    
    // Avoid redundant pushes if the value is already the same
    if (searchParams.get("search") !== params.get("search") && 
        !(searchParams.get("search") === null && params.get("search") === null)) {
      startTransition(() => {
        router.push(`/menu?${params.toString()}`, { scroll: false });
      });
    }
  }, [debouncedSearch, router, searchParams, isMounted]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0">
      <label htmlFor="menu-search" className="sr-only">Search menu items</label>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        id="menu-search"
        className="block w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all shadow-sm"
        placeholder="Search burgers, pizza, coffee..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
