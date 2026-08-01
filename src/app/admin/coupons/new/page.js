"use client";

import React from 'react';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import CouponForm from '@/frontend/components/admin/coupons/CouponForm';

export default function NewCouponPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <AdminPageHeader 
        title="Create New Coupon" 
        subtitle="Add a new discount code for your customers"
        backLink="/admin/coupons"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CouponForm />
      </div>
    </main>
  );
}
