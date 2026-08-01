"use client";

import React from 'react';
import { Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export default function CategoryTable({ categories, onEdit, onDelete, onStatusToggle }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4 text-center">Sort Order</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
                        {category.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-gray-900">{category.name}</p>
                      {category.description && (
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{category.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {category.slug}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-bold text-gray-700">{category.sortOrder}</span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => onStatusToggle(category)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                      category.isActive 
                        ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {category.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Category"
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
