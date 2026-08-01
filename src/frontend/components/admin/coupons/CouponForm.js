"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createAdminCoupon, updateAdminCoupon } from '@/frontend/services/admin/couponService';
import { fetchAdminCategories } from '@/frontend/services/admin/categoryService';
import { Tag, Calendar, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(30).trim(),
  description: z.string().max(300).optional().or(z.literal("")),
  discountType: z.enum(["percentage", "fixed"], { required_error: "Type is required" }),
  discountValue: z.coerce.number().positive("Value must be greater than 0"),
  minimumOrder: z.coerce.number().min(0).default(0),
  maximumDiscount: z.coerce.number().min(0).optional().or(z.literal("")),
  validFrom: z.string().min(1, "Valid from date is required"),
  expiresAt: z.string().min(1, "Expiry date is required"),
  usageLimit: z.coerce.number().min(1).optional().or(z.literal("")),
  perUserLimit: z.coerce.number().min(1).default(1),
  isActive: z.boolean().default(true),
  applicableCategories: z.array(z.string()).default([]),
}).superRefine((data, ctx) => {
  const validFromDate = new Date(data.validFrom);
  const expiresAtDate = new Date(data.expiresAt);
  if (expiresAtDate <= validFromDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Expiry date must be after valid from date",
      path: ["expiresAt"],
    });
  }
  if (data.discountType === "percentage" && data.discountValue > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Percentage discount cannot exceed 100",
      path: ["discountValue"],
    });
  }
});

export default function CouponForm({ initialData = null }) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format dates for input type="datetime-local"
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  const { register, handleSubmit, watch, formState: { errors }, setValue, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: initialData?.code || '',
      description: initialData?.description || '',
      discountType: initialData?.discountType || 'percentage',
      discountValue: initialData?.discountValue || '',
      minimumOrder: initialData?.minimumOrder || 0,
      maximumDiscount: initialData?.maximumDiscount || '',
      validFrom: formatDateForInput(initialData?.validFrom) || formatDateForInput(new Date()),
      expiresAt: formatDateForInput(initialData?.expiresAt) || '',
      usageLimit: initialData?.usageLimit || '',
      perUserLimit: initialData?.perUserLimit || 1,
      isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
      applicableCategories: initialData?.applicableCategories?.map(c => typeof c === 'object' ? c._id : c) || [],
    }
  });

  const discountType = watch("discountType");
  const currentCode = watch("code");

  useEffect(() => {
    if (currentCode) {
      const upper = currentCode.toUpperCase();
      if (currentCode !== upper) {
        setValue("code", upper, { shouldValidate: true });
      }
    }
  }, [currentCode, setValue]);

  useEffect(() => {
    async function loadCategories() {
      setLoadingCategories(true);
      try {
        const query = new URLSearchParams();
        query.set('limit', '100'); // Load many categories for selection
        const res = await fetchAdminCategories(query);
        setCategories(res.categories || []);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Clean up empty optional numbers
      if (data.maximumDiscount === "") data.maximumDiscount = null;
      if (data.usageLimit === "") data.usageLimit = null;

      if (isEditing) {
        await updateAdminCoupon(initialData._id, data);
        toast.success("Coupon updated successfully");
      } else {
        await createAdminCoupon(data);
        toast.success("Coupon created successfully");
      }
      router.push('/admin/coupons');
      router.refresh();
    } catch (error) {
      console.error(error);
      if (error.errors) {
        error.errors.forEach(err => {
          setError(err.path[0], { type: 'manual', message: err.message });
        });
      } else {
        toast.error(error.message || "Failed to save coupon");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
      
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
        <Tag className="w-64 h-64" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-8 max-w-4xl">
        
        {/* Section 1: Basic Information */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Coupon Code *</label>
              <input 
                type="text"
                {...register("code")}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 font-black uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                placeholder="e.g. SUMMER20"
              />
              {errors.code && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.code.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border border-gray-200 p-2.5 rounded-xl transition-colors hover:bg-gray-100">
                <input 
                  type="checkbox"
                  {...register("isActive")}
                  className="w-5 h-5 text-brand-charcoal rounded border-gray-300 focus:ring-brand-yellow transition-colors"
                />
                <span className="text-sm font-bold text-gray-900">Active (can be applied by users)</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description (Optional)</label>
              <textarea 
                {...register("description")}
                rows="2"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors resize-none"
                placeholder="Internal description or notes about this coupon..."
              />
              {errors.description && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Discount Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Discount Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Discount Type *</label>
              <select 
                {...register("discountType")}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
              >
                <option value="percentage">Percentage Discount (%)</option>
                <option value="fixed">Fixed Amount Discount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Discount Value *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  {discountType === 'percentage' ? '%' : '₹'}
                </span>
                <input 
                  type="number"
                  step="0.01"
                  {...register("discountValue")}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-9 pr-4 py-2.5 text-sm font-black focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                  placeholder={discountType === 'percentage' ? "20" : "100"}
                />
              </div>
              {errors.discountValue && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.discountValue.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Order Amount (₹)</label>
              <input 
                type="number"
                step="0.01"
                {...register("minimumOrder")}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                placeholder="0"
              />
              {errors.minimumOrder && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.minimumOrder.message}
                </p>
              )}
            </div>
            {discountType === 'percentage' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Discount Amount (₹)</label>
                <input 
                  type="number"
                  step="0.01"
                  {...register("maximumDiscount")}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                  placeholder="Optional limit"
                />
                <p className="text-[10px] text-gray-500 mt-1">Leave empty for unlimited discount.</p>
                {errors.maximumDiscount && (
                  <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.maximumDiscount.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Usage Limits & Conditions */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Usage Limits & Validity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Valid From *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="datetime-local"
                  {...register("validFrom")}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                />
              </div>
              {errors.validFrom && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.validFrom.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Expires At *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="datetime-local"
                  {...register("expiresAt")}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                />
              </div>
              {errors.expiresAt && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.expiresAt.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Usage Limit</label>
              <input 
                type="number"
                {...register("usageLimit")}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                placeholder="Unlimited if empty"
              />
              {errors.usageLimit && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.usageLimit.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Per User Limit *</label>
              <input 
                type="number"
                {...register("perUserLimit")}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors"
                placeholder="1"
              />
              {errors.perUserLimit && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.perUserLimit.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Applicability */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Applicability
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Applicable Categories</label>
              <select 
                multiple
                {...register("applicableCategories")}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors min-h-[120px]"
              >
                {loadingCategories ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))
                )}
              </select>
              <p className="text-[10px] text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple. Leave empty to apply to all categories.</p>
              {errors.applicableCategories && (
                <p className="text-brand-red text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.applicableCategories.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-6 py-2.5 text-gray-700 font-bold hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-brand-charcoal text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            )}
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Coupon' : 'Create Coupon')}
          </button>
        </div>

      </form>
    </div>
  );
}
