"use client";

import React from 'react';
import { Edit2, Trash2, CheckCircle2, XCircle, Star, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProductTable({ products, onDelete, onStatusToggle, onFeaturedToggle }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="hidden lg:block w-full overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category & Type</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-center">Featured</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.imageUrl || (product.images && product.images[0]) ? (
                      <img 
                        src={product.imageUrl || product.images[0]} 
                        alt={product.name} 
                        className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-gray-200" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{product.name}</p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{product.slug}</p>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                      {product.categoryName || product.category}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                      product.foodType === 'veg' ? 'bg-green-50 text-green-700 border-green-200' : 
                      product.foodType === 'vegan' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {product.foodType}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 text-right">
                  {product.salePrice && product.salePrice > 0 && product.salePrice < product.basePrice ? (
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-brand-charcoal">₹{product.salePrice.toFixed(2)}</span>
                      <span className="text-xs font-medium text-gray-400 line-through">₹{product.basePrice.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-sm font-black text-brand-charcoal">₹{product.basePrice.toFixed(2)}</span>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <p className="text-[10px] text-gray-500 font-bold mt-1">+{product.sizes.length} sizes</p>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => onFeaturedToggle(product)}
                    className={`p-1.5 rounded-full transition-colors ${
                      product.isFeatured ? 'text-brand-yellow hover:bg-yellow-50' : 'text-gray-300 hover:text-gray-400 hover:bg-gray-100'
                    }`}
                    title="Toggle Featured"
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                </td>
                
                <td className="px-6 py-4">
                  <button 
                    onClick={() => onStatusToggle(product)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                      product.isAvailable 
                        ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {product.isAvailable ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {product.isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      href={`/admin/products/${product._id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => onDelete(product)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
