"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import CouponForm from '@/frontend/components/admin/coupons/CouponForm';
import { fetchAdminCoupon } from '@/frontend/services/admin/couponService';
import { toast } from 'sonner';

export default function EditCouponPage() {
  const params = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!params.id) return;
      try {
        const data = await fetchAdminCoupon(params.id);
        setInitialData(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load coupon details");
        router.push('/admin/coupons');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50/50 pb-20">
        <AdminPageHeader title="Edit Coupon" backLink="/admin/coupons" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[400px]">
          <div className="text-gray-400 font-bold flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-charcoal rounded-full animate-spin"></div>
            Loading...
          </div>
        </div>
      </main>
    );
  }

  if (!initialData) return null;

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <AdminPageHeader 
        title="Edit Coupon" 
        subtitle={`Update settings for ${initialData.code}`}
        backLink="/admin/coupons"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CouponForm initialData={initialData} />
      </div>
    </main>
  );
}
