"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/backend/validations/productValidation';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Upload } from 'lucide-react';
import { createAdminProduct, updateAdminProduct } from '@/frontend/services/admin/productService';
import { fetchAdminCategories } from '@/frontend/services/admin/categoryService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ProductSizeFields from './ProductSizeFields';
import ProductAddOnFields from './ProductAddOnFields';
import TagsInput from './TagsInput';

export default function ProductForm({ initialData = null }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const isEditing = !!initialData;

  useEffect(() => {
    fetchAdminCategories(new URLSearchParams({ limit: 100, status: 'active' }))
      .then(data => setCategories(data.categories))
      .catch(err => toast.error("Failed to load categories"));
  }, []);

  const { register, handleSubmit, control, setValue, formState: { errors }, watch } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      shortDescription: initialData?.shortDescription || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      foodType: initialData?.foodType || "veg",
      basePrice: initialData?.basePrice || initialData?.price || 0,
      salePrice: initialData?.salePrice || 0,
      imageUrl: initialData?.imageUrl || "",
      sizes: initialData?.sizes || [],
      addOns: initialData?.addOns || [],
      stock: initialData?.stock || 0,
      preparationTime: initialData?.preparationTime || 15,
      ingredients: initialData?.ingredients || [],
      tags: initialData?.tags || [],
      isAvailable: initialData?.isAvailable !== undefined ? initialData.isAvailable : true,
      isFeatured: initialData?.isFeatured || false,
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (isEditing) {
        await updateAdminProduct(initialData._id, data);
        toast.success("Product updated successfully");
      } else {
        await createAdminProduct(data);
        toast.success("Product created successfully");
      }
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      if (error.errors && Object.keys(error.errors).length > 0) {
        Object.values(error.errors).forEach(msg => toast.error(msg));
      } else {
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      // Set the input value
      setValue('imageUrl', data.url, { shouldValidate: true });
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl pb-12">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products"
            className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-black text-brand-charcoal">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-bold text-brand-charcoal bg-brand-yellow hover:bg-[#E5A800] rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-charcoal border-b border-gray-100 pb-3">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Product Name *</label>
              <input 
                {...register("name")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
                placeholder="e.g. Margherita Pizza"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
              <input 
                {...register("shortDescription")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
                placeholder="Brief tagline (max 150 chars)"
              />
              {errors.shortDescription && <p className="text-red-500 text-xs mt-1 font-medium">{errors.shortDescription.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Description *</label>
              <textarea 
                {...register("description")}
                rows="4"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm resize-none custom-scrollbar"
                placeholder="Detailed description of the product..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
              <div className="flex gap-2">
                <input 
                  {...register("imageUrl")}
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
                  placeholder="https://example.com/image.jpg"
                />
                <div className="relative shrink-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                    title="Upload Image"
                  />
                  <button 
                    type="button" 
                    disabled={isUploading}
                    className="h-full px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload
                  </button>
                </div>
              </div>
              {errors.imageUrl && <p className="text-red-500 text-xs mt-1 font-medium">{errors.imageUrl.message}</p>}
            </div>
          </div>

          {/* Variations (Sizes & Addons) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-brand-charcoal border-b border-gray-100 pb-3">Variations & Options</h3>
            <ProductSizeFields control={control} register={register} errors={errors} />
            <ProductAddOnFields control={control} register={register} errors={errors} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Pricing & Classification */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-charcoal border-b border-gray-100 pb-3">Pricing & Type</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Base Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input 
                    {...register("basePrice", { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    className="w-full pl-7 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
                  />
                </div>
                {errors.basePrice && <p className="text-red-500 text-xs mt-1 font-medium">{errors.basePrice.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Sale Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input 
                    {...register("salePrice", { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    className="w-full pl-7 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
                  />
                </div>
                {errors.salePrice && <p className="text-red-500 text-xs mt-1 font-medium">{errors.salePrice.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category *</label>
              {categories.length === 0 ? (
                <div className="p-3 bg-yellow-50 text-yellow-800 text-sm rounded-xl border border-yellow-200">
                  No active categories found. Please <Link href="/admin/categories" className="font-bold underline">create a category</Link> first.
                </div>
              ) : (
                <select 
                  {...register("category")}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm font-medium"
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              )}
              {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Food Type *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="veg" {...register("foodType")} className="text-brand-yellow focus:ring-brand-yellow" />
                  <span className="text-sm font-bold text-green-700">Veg</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="non-veg" {...register("foodType")} className="text-brand-yellow focus:ring-brand-yellow" />
                  <span className="text-sm font-bold text-red-700">Non-Veg</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="vegan" {...register("foodType")} className="text-brand-yellow focus:ring-brand-yellow" />
                  <span className="text-sm font-bold text-emerald-700">Vegan</span>
                </label>
              </div>
            </div>
          </div>

          {/* Status & Ops */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-charcoal border-b border-gray-100 pb-3">Operations & Status</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                <input 
                  {...register("stock", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Prep Time (m)</label>
                <input 
                  {...register("preparationTime", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-sm font-bold text-gray-800">Available</span>
                <input 
                  type="checkbox" 
                  {...register("isAvailable")} 
                  className="w-5 h-5 text-brand-yellow rounded border-gray-300 focus:ring-brand-yellow"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-sm font-bold text-gray-800">Featured</span>
                <input 
                  type="checkbox" 
                  {...register("isFeatured")} 
                  className="w-5 h-5 text-brand-yellow rounded border-gray-300 focus:ring-brand-yellow"
                />
              </label>
            </div>
          </div>

          {/* Tags & Ingredients */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-charcoal border-b border-gray-100 pb-3">Metadata</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ingredients</label>
              <Controller
                name="ingredients"
                control={control}
                render={({ field }) => (
                  <TagsInput 
                    value={field.value} 
                    onChange={field.onChange} 
                    placeholder="e.g. Flour, Tomato, Cheese"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tags</label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagsInput 
                    value={field.value} 
                    onChange={field.onChange} 
                    placeholder="e.g. Bestseller, Spicy"
                  />
                )}
              />
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
