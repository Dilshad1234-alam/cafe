"use client";

import React from 'react';
import { Edit2, Trash2, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';

export default function CategoryMobileCard({ category, onEdit, onDelete, onStatusToggle }) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="md:hidden bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative">
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex items-center gap-3">
          {category.image ? (
            <img src={category.image} alt={category.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100 shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg shrink-0">
              {category.name.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div>
            <h4 className="font-bold text-gray-900 leading-tight mb-1">{category.name}</h4>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              {category.slug}
            </span>
          </div>
        </div>

        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 text-gray-400 hover:bg-gray-100 rounded-lg"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Order</span>
          <span className="font-bold text-gray-700">{category.sortOrder}</span>
        </div>
        
        <button 
          onClick={() => onStatusToggle(category)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
            category.isActive 
              ? 'bg-green-50 text-green-700' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {category.isActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {category.isActive ? 'Active' : 'Inactive'}
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-4 top-12 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 w-36 animate-in fade-in slide-in-from-top-2">
          <button 
            onClick={() => { setShowMenu(false); onEdit(category); }}
            className="w-full text-left px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button 
            onClick={() => { setShowMenu(false); onDelete(category); }}
            className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
