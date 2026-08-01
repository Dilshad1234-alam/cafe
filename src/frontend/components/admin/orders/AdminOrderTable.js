import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function AdminOrderTable({ orders }) {
  return (
    <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <th className="p-4 pl-6">Order ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Type</th>
            <th className="p-4">Total</th>
            <th className="p-4">Status</th>
            <th className="p-4">Payment</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
              
              <td className="p-4 pl-6 align-middle">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">#{order.orderNumber}</span>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">{formatDate(order.createdAt)}</span>
                </div>
              </td>

              <td className="p-4 align-middle">
                <div className="flex flex-col max-w-[150px]">
                  <span className="font-bold text-gray-900 truncate" title={order.customer?.fullName || 'Unknown'}>
                    {order.customer?.fullName || 'Unknown'}
                  </span>
                  <span className="text-xs text-gray-500 font-medium truncate">
                    {order.customer?.phone || 'No phone'}
                  </span>
                </div>
              </td>

              <td className="p-4 align-middle">
                <span className="text-xs font-bold uppercase bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                  {order.orderType}
                </span>
              </td>

              <td className="p-4 align-middle">
                <div className="flex flex-col">
                  <span className="font-black text-gray-900">₹{(order.pricing?.total || 0).toFixed(2)}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                  </span>
                </div>
              </td>

              <td className="p-4 align-middle">
                <OrderStatusBadge status={order.orderStatus} />
              </td>

              <td className="p-4 align-middle">
                <PaymentStatusBadge status={order.paymentStatus} />
              </td>

              <td className="p-4 align-middle text-center">
                <Link 
                  href={`/admin/orders/${order.orderNumber}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-brand-charcoal text-xs font-bold rounded-lg hover:border-brand-yellow hover:text-brand-yellow transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
