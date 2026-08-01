"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { createAdminCategory, updateAdminCategory } from '@/frontend/services/admin/categoryService';

// Client-side schema mirroring backend
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
  description: z.string().max(300, "Description cannot exceed 300 characters").optional().default(""),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export default function CategoryForm({ initialData = null, onSuccess, onCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      image: initialData?.image || "",
      sortOrder: initialData?.sortOrder || 0,
      isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (isEditing) {
        await updateAdminCategory(initialData._id, data);
        toast.success("Category updated successfully");
      } else {
        await createAdminCategory(data);
        toast.success("Category created successfully");
      }
      onSuccess();
    } catch (error) {
      // Handle field-level errors if provided by the backend
      if (error.errors && Object.keys(error.errors).length > 0) {
        Object.values(error.errors).forEach(msg => toast.error(msg));
      } else {
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      {/* Name */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Category Name *</label>
        <input 
          {...register("name")}
          type="text"
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
          placeholder="e.g. Pizzas"
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
        {isEditing && <p className="text-gray-400 text-xs mt-1">Slug will be auto-updated if name changes.</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
        <textarea 
          {...register("description")}
          rows="3"
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm resize-none custom-scrollbar"
          placeholder="Short description of the category..."
          disabled={isSubmitting}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
        <input 
          {...register("image")}
          type="text"
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
          placeholder="https://example.com/image.jpg"
          disabled={isSubmitting}
        />
        {errors.image && <p className="text-red-500 text-xs mt-1 font-medium">{errors.image.message}</p>}
      </div>

      {/* Sort Order & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Sort Order</label>
          <input 
            {...register("sortOrder", { valueAsNumber: true })}
            type="number"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
            disabled={isSubmitting}
          />
          {errors.sortOrder && <p className="text-red-500 text-xs mt-1 font-medium">{errors.sortOrder.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
          <div className="flex items-center h-[42px] px-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                {...register("isActive")} 
                className="sr-only peer"
                disabled={isSubmitting}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-bold text-brand-charcoal bg-brand-yellow hover:bg-[#E5A800] rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEditing ? 'Save Changes' : 'Create Category'}
        </button>
      </div>

    </form>
  );
}
