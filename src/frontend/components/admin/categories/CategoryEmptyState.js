import React from 'react';
import { FolderTree, Plus } from 'lucide-react';

export default function CategoryEmptyState({ onAddClick, hasFilters }) {
  return (
    <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center flex flex-col items-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <FolderTree className="w-10 h-10 text-gray-300" />
      </div>
      <h2 className="font-serif text-2xl font-black text-brand-charcoal mb-2">
        {hasFilters ? "No categories found" : "No categories yet"}
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        {hasFilters 
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Get started by creating your first category to organize your menu items."
        }
      </p>
      
      {!hasFilters && (
        <button 
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-charcoal hover:bg-gray-800 text-white rounded-xl font-bold transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add Category
        </button>
      )}
    </div>
  );
}
