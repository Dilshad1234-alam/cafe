"use client";

import React, { useState } from 'react';
import CategoryDialog from './CategoryDialog';
import { deleteAdminCategory } from '@/frontend/services/admin/categoryService';
import { toast } from 'sonner';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function DeleteCategoryDialog({ isOpen, onClose, category, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!category) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteAdminCategory(category._id);
      toast.success(`Category "${category.name}" deleted`);
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <CategoryDialog isOpen={isOpen} onClose={onClose} title="Delete Category">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Delete "{category.name}"?
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          This action cannot be undone. You can only delete categories that have no products assigned to them.
        </p>
        
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </CategoryDialog>
  );
}
