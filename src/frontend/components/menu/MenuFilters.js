"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

export default function MenuFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Current values (from URL)
  const currentFoodType = searchParams.get("foodType") || "all";
  const currentPrice = searchParams.get("price") || "all";
  const currentPopular = searchParams.get("popular") === "true";
  const currentOffers = searchParams.get("offers") === "true";

  // Optimistic UI states
  const [optFoodType, setOptFoodType] = useState(currentFoodType);
  const [optPrice, setOptPrice] = useState(currentPrice);
  const [optPopular, setOptPopular] = useState(currentPopular);
  const [optOffers, setOptOffers] = useState(currentOffers);

  // Sync optimistic states with actual URL when URL changes (if not pending)
  // This helps when filters are cleared elsewhere
  if (!isPending) {
    if (optFoodType !== currentFoodType) setOptFoodType(currentFoodType);
    if (optPrice !== currentPrice) setOptPrice(currentPrice);
    if (optPopular !== currentPopular) setOptPopular(currentPopular);
    if (optOffers !== currentOffers) setOptOffers(currentOffers);
  }

  // Active filter count
  let activeFiltersCount = 0;
  if (optFoodType !== "all") activeFiltersCount++;
  if (optPrice !== "all") activeFiltersCount++;
  if (optPopular) activeFiltersCount++;
  if (optOffers) activeFiltersCount++;

  const handleFilterChange = (key, value) => {
    // Optimistic UI update for immediate feedback
    if (key === "foodType") setOptFoodType(value);
    if (key === "price") setOptPrice(value);
    if (key === "popular") setOptPopular(value);
    if (key === "offers") setOptOffers(value);

    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "all" || value === false || value === null) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }
    
    startTransition(() => {
      router.push(`/menu?${params.toString()}`, { scroll: false });
    });
  };

  const clearAllFilters = () => {
    setOptFoodType("all");
    setOptPrice("all");
    setOptPopular(false);
    setOptOffers(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("foodType");
    params.delete("price");
    params.delete("popular");
    params.delete("offers");
    startTransition(() => {
      router.push(`/menu?${params.toString()}`, { scroll: false });
    });
    setIsOpen(false);
  };

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Food Type */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Food Type</h3>
        <div className="flex gap-2">
          {["all", "veg", "non-veg"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange("foodType", type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                optFoodType === type 
                  ? "bg-brand-charcoal text-brand-yellow" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
        <div className="flex flex-col gap-2">
          {[
            { id: "all", label: "All Prices" },
            { id: "under-100", label: "Under ₹100" },
            { id: "100-199", label: "₹100 - ₹199" },
            { id: "200-299", label: "₹200 - ₹299" },
            { id: "300-plus", label: "₹300 and above" },
          ].map((range) => (
            <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="priceRange" 
                value={range.id}
                checked={optPrice === range.id}
                onChange={() => handleFilterChange("price", range.id)}
                className="w-4 h-4 text-brand-charcoal focus:ring-brand-yellow border-gray-300"
              />
              <span className={`text-sm ${optPrice === range.id ? "font-semibold text-brand-charcoal" : "text-gray-600 group-hover:text-brand-charcoal"}`}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Quick Filters</h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={optPopular}
              onChange={(e) => handleFilterChange("popular", e.target.checked)}
              className="w-4 h-4 rounded text-brand-charcoal focus:ring-brand-yellow border-gray-300"
            />
            <span className="text-sm text-gray-600 group-hover:text-brand-charcoal">Popular Items</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={optOffers}
              onChange={(e) => handleFilterChange("offers", e.target.checked)}
              className="w-4 h-4 rounded text-brand-charcoal focus:ring-brand-yellow border-gray-300"
            />
            <span className="text-sm text-gray-600 group-hover:text-brand-charcoal">Special Offers</span>
          </label>
        </div>
      </div>
      
      {activeFiltersCount > 0 && (
        <button 
          onClick={clearAllFilters}
          className="w-full py-2 mt-4 text-sm font-semibold text-brand-red border border-brand-red rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-brand-yellow transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="bg-brand-charcoal text-brand-yellow text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Desktop Sidebar (hidden on mobile, but rendered as block on md) */}
      <div className="hidden md:block w-64 shrink-0 pr-8 border-r border-gray-100">
        <div className="flex items-center gap-2 mb-6 text-brand-charcoal">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="font-bold text-lg">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-brand-charcoal text-brand-yellow text-xs px-2 py-0.5 rounded-full ml-auto">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {renderFilterContent()}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="relative w-[300px] max-w-[80vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-brand-charcoal flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {renderFilterContent()}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-900 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
