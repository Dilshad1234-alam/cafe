"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchAdminCoupons } from '@/frontend/services/admin/couponService';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import CouponToolbar from '@/frontend/components/admin/coupons/CouponToolbar';
import CouponFilters from '@/frontend/components/admin/coupons/CouponFilters';
import CouponTable from '@/frontend/components/admin/coupons/CouponTable';
import CouponMobileCard from '@/frontend/components/admin/coupons/CouponMobileCard';
import CouponSkeleton from '@/frontend/components/admin/coupons/CouponSkeleton';
import CouponEmptyState from '@/frontend/components/admin/coupons/CouponEmptyState';
import Pagination from '@/frontend/components/common/Pagination';
import { toast } from 'sonner';

export default function AdminCouponsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCoupons = async () => {
    setIsLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const data = await fetchAdminCoupons(params);
      setCoupons(data.coupons);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load coupons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = Array.from(searchParams.entries()).some(([key, val]) => 
    key !== 'page' && key !== 'limit' && val !== 'all' && val !== ''
  );

  const handleCouponUpdate = (updatedCoupon) => {
    setCoupons((prev) => 
      prev.map((c) => c._id === updatedCoupon._id ? updatedCoupon : c)
    );
  };

  const handleCouponDelete = (id) => {
    setCoupons((prev) => prev.filter((c) => c._id !== id));
    if (coupons.length === 1 && pagination?.page > 1) {
      handlePageChange(pagination.page - 1);
    } else {
      loadCoupons();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <AdminPageHeader 
        title="Coupon Management" 
        subtitle="Create and manage discount codes"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CouponToolbar totalCoupons={pagination?.total || 0} />
        <CouponFilters />

        {isLoading ? (
          <CouponSkeleton />
        ) : coupons.length === 0 ? (
          <CouponEmptyState hasFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
        ) : (
          <>
            <CouponTable 
              coupons={coupons} 
              onCouponUpdate={handleCouponUpdate} 
              onCouponDelete={handleCouponDelete}
            />
            
            <div className="lg:hidden flex flex-col gap-4">
              {coupons.map((coupon) => (
                <CouponMobileCard 
                  key={coupon._id} 
                  coupon={coupon} 
                  onCouponUpdate={handleCouponUpdate}
                  onCouponDelete={handleCouponDelete}
                />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination 
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
