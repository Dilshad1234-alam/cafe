"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAdminOrderDetails } from '@/frontend/services/admin/orderService';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import OrderStatusBadge from '@/frontend/components/admin/orders/OrderStatusBadge';
import PaymentStatusBadge from '@/frontend/components/admin/orders/PaymentStatusBadge';
import OrderDetailsPanel from '@/frontend/components/admin/orders/OrderDetailsPanel';
import OrderItemsList from '@/frontend/components/admin/orders/OrderItemsList';
import OrderTimeline from '@/frontend/components/admin/orders/OrderTimeline';
import UpdateOrderStatusDialog from '@/frontend/components/admin/orders/UpdateOrderStatusDialog';
import UpdatePaymentStatusDialog from '@/frontend/components/admin/orders/UpdatePaymentStatusDialog';
import CancelOrderDialog from '@/frontend/components/admin/orders/CancelOrderDialog';
import { toast } from 'sonner';
import { ArrowLeft, Edit2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = params.orderNumber;
  
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const loadOrder = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminOrderDetails(orderNumber);
      setOrder(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load order details");
      router.push('/admin/orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderNumber) {
      loadOrder();
    }
  }, [orderNumber]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50/50 pb-20">
        <AdminPageHeader title="Order Details" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[400px]">
          <div className="text-gray-400 font-bold flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-charcoal rounded-full animate-spin"></div>
            Loading...
          </div>
        </div>
      </main>
    );
  }

  if (!order) return null;

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <AdminPageHeader 
        title={`Order #${order.orderNumber}`} 
        subtitle="Manage order details, status, and payment"
        backLink="/admin/orders"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Actions & Badges */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowStatusDialog(true)}
              title="Update Order Status"
            >
              <OrderStatusBadge status={order.orderStatus} />
            </div>
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowPaymentDialog(true)}
              title="Update Payment Status"
            >
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' && (
              <button 
                onClick={() => setShowCancelDialog(true)}
                className="flex-1 sm:flex-none px-4 py-2 border border-brand-red text-brand-red bg-white hover:bg-red-50 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Cancel Order
              </button>
            )}
            
            {(order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered') && (
              <button 
                onClick={() => setShowStatusDialog(true)}
                className="flex-1 sm:flex-none px-4 py-2 bg-brand-charcoal hover:bg-gray-900 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                Update Status
              </button>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <OrderDetailsPanel order={order} />
            <OrderItemsList order={order} />
          </div>
          <div className="xl:col-span-1">
            <OrderTimeline history={order.statusHistory} />
          </div>
        </div>
      </div>

      {showStatusDialog && (
        <UpdateOrderStatusDialog 
          order={order} 
          onClose={() => setShowStatusDialog(false)} 
          onUpdate={setOrder}
        />
      )}
      
      {showPaymentDialog && (
        <UpdatePaymentStatusDialog 
          order={order} 
          onClose={() => setShowPaymentDialog(false)} 
          onUpdate={setOrder}
        />
      )}
      
      {showCancelDialog && (
        <CancelOrderDialog 
          order={order} 
          onClose={() => setShowCancelDialog(false)} 
          onUpdate={setOrder}
        />
      )}
    </main>
  );
}
