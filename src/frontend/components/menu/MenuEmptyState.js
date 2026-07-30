import Link from "next/link";
import { UtensilsCrossed, RefreshCw } from "lucide-react";

export default function MenuEmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed my-8">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-gray-400">
        <UtensilsCrossed className="w-10 h-10" />
      </div>
      
      <h3 className="text-2xl font-bold text-brand-charcoal mb-3">No menu items found</h3>
      
      <p className="text-gray-500 max-w-md mb-8">
        We couldn&apos;t find any items matching your current filters or search query. 
        Try adjusting your criteria or exploring other categories.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {onClearFilters && (
          <button 
            onClick={onClearFilters}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-charcoal text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Clear All Filters
          </button>
        )}
        <Link 
          href="/menu"
          className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          View Full Menu
        </Link>
      </div>
    </div>
  );
}
