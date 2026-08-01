"use client";

import React, { useState } from 'react';
import CategoryDialog from '../categories/CategoryDialog'; // Reusing dialog container
import { deleteAdminProduct } from '@/frontend/services/admin/productService';
import { toast } from 'sonner';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function DeleteProductDialog({ isOpen, onClose, product, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!product) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteAdminProduct(product._id);
      if (res.archived) {
        toast.info(res.message);
      } else {
        toast.success(res.message);
      }
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <CategoryDialog isOpen={isOpen} onClose={onClose} title="Delete Product">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Delete "{product.name}"?
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          If this product is linked to existing orders, it will be safely archived (marked as inactive) instead of being permanently deleted.
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
