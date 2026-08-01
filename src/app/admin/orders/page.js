"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import { fetchAdminOrders } from '@/frontend/services/admin/orderService';
import AdminOrderToolbar from '@/frontend/components/admin/orders/AdminOrderToolbar';
import AdminOrderFilters from '@/frontend/components/admin/orders/AdminOrderFilters';
import AdminOrderTable from '@/frontend/components/admin/orders/AdminOrderTable';
import AdminOrderMobileCard from '@/frontend/components/admin/orders/AdminOrderMobileCard';
import OrdersEmptyState from '@/frontend/components/admin/orders/OrdersEmptyState';
import OrdersSkeleton from '@/frontend/components/admin/orders/OrdersSkeleton';
import Pagination from '@/frontend/components/common/Pagination';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrdersData = async () => {
    setIsLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const data = await fetchAdminOrders(params);
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error(error.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
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
        title="Order Management" 
        subtitle="View and manage all customer orders"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminOrderToolbar totalOrders={pagination?.total || 0} />
        <AdminOrderFilters />

        {isLoading ? (
          <OrdersSkeleton />
        ) : orders.length === 0 ? (
          <OrdersEmptyState hasFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
        ) : (
          <>
            <AdminOrderTable orders={orders} />
            <div className="lg:hidden flex flex-col gap-4">
              {orders.map(order => (
                <AdminOrderMobileCard key={order._id} order={order} />
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
