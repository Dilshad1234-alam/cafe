"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchAdminCustomers } from '@/frontend/services/admin/customerService';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import CustomerToolbar from '@/frontend/components/admin/customers/CustomerToolbar';
import CustomerFilters from '@/frontend/components/admin/customers/CustomerFilters';
import CustomerTable from '@/frontend/components/admin/customers/CustomerTable';
import CustomerMobileCard from '@/frontend/components/admin/customers/CustomerMobileCard';
import CustomersSkeleton from '@/frontend/components/admin/customers/CustomersSkeleton';
import CustomersEmptyState from '@/frontend/components/admin/customers/CustomersEmptyState';
import Pagination from '@/frontend/components/common/Pagination';
import { toast } from 'sonner';

export default function AdminCustomersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const data = await fetchAdminCustomers(params);
      setCustomers(data.customers);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load customers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
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
        title="Customer Management" 
        subtitle="View and manage all customer accounts"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomerToolbar totalCustomers={pagination?.total || 0} />
        <CustomerFilters />

        {isLoading ? (
          <CustomersSkeleton />
        ) : customers.length === 0 ? (
          <CustomersEmptyState hasFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
        ) : (
          <>
            <CustomerTable customers={customers} />
            
            <div className="lg:hidden flex flex-col gap-4">
              {customers.map((customer) => (
                <CustomerMobileCard key={customer._id} customer={customer} />
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
