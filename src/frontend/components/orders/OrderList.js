"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMyOrders } from '@/frontend/services/orderService';
import OrderCard from './OrderCard';
import OrdersEmptyState from './OrdersEmptyState';
import OrdersSkeleton from './OrdersSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrderList() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'all';
  const pageParam = parseInt(searchParams.get('page')) || 1;

  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMyOrders(pageParam, 10, status);
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [status, pageParam]);

  if (loading) {
    return <OrdersSkeleton />;
  }

  if (error) {
    return <OrdersSkeleton error={error} onRetry={loadOrders} />;
  }

  if (orders.length === 0) {
    return <OrdersEmptyState filterActive={status !== 'all'} />;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
      
      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <a
            href={`/account/orders?status=${status}&page=${Math.max(1, pageParam - 1)}`}
            className={`p-3 rounded-full border border-gray-200 transition-colors ${
              pageParam === 1 
                ? 'bg-gray-50 text-gray-400 pointer-events-none' 
                : 'bg-white text-brand-charcoal hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </a>
          <span className="font-bold text-gray-500">
            Page {pageParam} of {pagination.totalPages}
          </span>
          <a
            href={`/account/orders?status=${status}&page=${Math.min(pagination.totalPages, pageParam + 1)}`}
            className={`p-3 rounded-full border border-gray-200 transition-colors ${
              pageParam === pagination.totalPages 
                ? 'bg-gray-50 text-gray-400 pointer-events-none' 
                : 'bg-white text-brand-charcoal hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
}
