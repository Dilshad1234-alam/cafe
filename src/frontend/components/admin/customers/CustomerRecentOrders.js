import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Eye, Calendar } from 'lucide-react';
import OrderStatusBadge from '@/frontend/components/admin/orders/OrderStatusBadge';
import PaymentStatusBadge from '@/frontend/components/admin/orders/PaymentStatusBadge';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function CustomerRecentOrders({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No Orders Yet</h3>
        <p className="text-gray-500 text-sm">This customer hasn't placed any orders.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-brand-charcoal" />
          Recent Orders
        </h3>
        <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
          Last {orders.length} orders
        </span>
      </div>
      
      <div className="divide-y divide-gray-50">
        {orders.map((order) => (
          <div key={order._id} className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100 shrink-0">
                <ShoppingBag className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">#{order.orderNumber}</h4>
                  <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {order.orderType}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(order.createdAt)}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{order.items?.length || 0} items</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 ml-0 sm:ml-auto">
              <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center mb-3 sm:mb-0">
                <span className="font-black text-brand-charcoal text-lg">
                  ₹{(order.pricing?.total || 0).toFixed(2)}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <OrderStatusBadge status={order.orderStatus} />
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>
              </div>
              
              <Link 
                href={`/admin/orders/${order.orderNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2 bg-white border border-gray-200 text-brand-charcoal text-sm font-bold rounded-xl hover:border-brand-yellow hover:text-brand-yellow transition-colors shadow-sm shrink-0"
              >
                <Eye className="w-4 h-4" />
                View Order
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
