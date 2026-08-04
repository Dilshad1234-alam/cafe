"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import { fetchAdminPayments, fetchPaymentSummary } from '@/frontend/services/admin/paymentService';
import Pagination from '@/frontend/components/common/Pagination';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';
import PaymentSummaryCards from '@/frontend/components/admin/payments/PaymentSummaryCards';
import PaymentFilters from '@/frontend/components/admin/payments/PaymentFilters';
import PaymentTable from '@/frontend/components/admin/payments/PaymentTable';
import PaymentMobileCard from '@/frontend/components/admin/payments/PaymentMobileCard';
import PaymentsSkeleton from '@/frontend/components/admin/payments/PaymentsSkeleton';
import PaymentsEmptyState from '@/frontend/components/admin/payments/PaymentsEmptyState';

export default function AdminPaymentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const [listData, summaryData] = await Promise.all([
        fetchAdminPayments(params),
        fetchPaymentSummary()
      ]);
      setPayments(listData.payments);
      setPagination(listData.pagination);
      setSummary(summaryData.data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      toast.error(error.message || "Failed to load payments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <AdminPageHeader 
        title="Payment History" 
        subtitle="View and manage customer payments"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {summary && <PaymentSummaryCards summary={summary} />}
        
        <PaymentFilters />

        {isLoading ? (
          <PaymentsSkeleton />
        ) : payments.length === 0 ? (
          <PaymentsEmptyState hasFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
        ) : (
          <>
            <PaymentTable payments={payments} />
            <div className="lg:hidden flex flex-col gap-4">
              {payments.map(payment => (
                <PaymentMobileCard key={payment.id} payment={payment} />
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
