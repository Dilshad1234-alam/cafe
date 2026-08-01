"use client";

import React from 'react';
import { Edit2, Trash2, CheckCircle2, XCircle, MoreVertical, Star, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProductMobileCard({ product, onDelete, onStatusToggle, onFeaturedToggle }) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="lg:hidden bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative">
      <div className="flex items-start justify-between gap-4 mb-3">
        
        <div className="flex items-center gap-3">
          <div className="relative">
            {product.imageUrl || (product.images && product.images[0]) ? (
              <img 
                src={product.imageUrl || product.images[0]} 
                alt={product.name} 
                className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0 border border-gray-200" 
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
            <button 
              onClick={() => onFeaturedToggle(product)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm border border-gray-100"
            >
              <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`} />
            </button>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-1">{product.name}</h4>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded truncate max-w-[100px]">
                {product.categoryName || product.category}
              </span>
              <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded border ${
                product.foodType === 'veg' ? 'bg-green-50 text-green-700 border-green-200' : 
                product.foodType === 'vegan' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                'bg-red-50 text-red-700 border-red-200'
              }`}>
                {product.foodType}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {product.salePrice && product.salePrice > 0 && product.salePrice < product.basePrice ? (
                <>
                  <span className="text-sm font-black text-brand-charcoal">₹{product.salePrice.toFixed(2)}</span>
                  <span className="text-xs font-medium text-gray-400 line-through">₹{product.basePrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-sm font-black text-brand-charcoal">₹{product.basePrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 text-gray-400 hover:bg-gray-100 rounded-lg shrink-0"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded truncate max-w-[140px]">
          {product.slug}
        </span>
        
        <button 
          onClick={() => onStatusToggle(product)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors uppercase tracking-wide ${
            product.isAvailable 
              ? 'bg-green-50 text-green-700' 
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {product.isAvailable ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {product.isAvailable ? 'Available' : 'Unavailable'}
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-4 top-12 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 w-36 animate-in fade-in slide-in-from-top-2">
          <Link 
            href={`/admin/products/${product._id}/edit`}
            className="w-full text-left px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </Link>
          <button 
            onClick={() => { setShowMenu(false); onDelete(product); }}
            className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
