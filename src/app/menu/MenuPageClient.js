"use client";

import { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import MenuHero from "@/frontend/components/menu/MenuHero";
import MenuSearch from "@/frontend/components/menu/MenuSearch";
import CategoryFilter from "@/frontend/components/menu/CategoryFilter";
import MenuFilters from "@/frontend/components/menu/MenuFilters";
import MenuToolbar from "@/frontend/components/menu/MenuToolbar";
import ProductCard from "@/frontend/components/menu/ProductCard";
import MenuEmptyState from "@/frontend/components/menu/MenuEmptyState";
import MenuPromoBanner from "@/frontend/components/menu/MenuPromoBanner";
import { useMenuFilters } from "@/frontend/hooks/useMenuFilters";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MenuPageClient({ initialProducts = [], initialCategories = [] }) {
  const { products, totalResults } = useMenuFilters(initialProducts);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Pagination State
  const initialLoadCount = 12;
  const [visibleCount, setVisibleCount] = useState(initialLoadCount);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(initialLoadCount);
  }, [searchParams]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const [isPending, startTransition] = useTransition();

  const handleClearFilters = () => {
    startTransition(() => {
      router.push("/menu", { scroll: false });
    });
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < totalResults;

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <MenuHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          <MenuSearch />
          <CategoryFilter categories={initialCategories} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Desktop Filters (Mobile is a drawer inside MenuFilters) */}
          <MenuFilters />
          
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <MenuToolbar totalResults={totalResults} />
            
            {totalResults === 0 ? (
              <MenuEmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {visibleProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button 
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-brand-charcoal text-brand-charcoal rounded-xl font-bold hover:bg-brand-charcoal hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Promo Banner at the bottom of the listings */}
            <MenuPromoBanner />
          </div>
          
        </div>
      </div>
    </main>
  );
}
