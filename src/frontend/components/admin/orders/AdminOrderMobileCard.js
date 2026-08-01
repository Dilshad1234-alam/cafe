import React from 'react';
import Link from 'next/link';
import { Eye, Clock, Phone, User, MapPin } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function AdminOrderMobileCard({ order }) {
  return (
    <div className="lg:hidden bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative flex flex-col gap-3">
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900 leading-tight mb-1">
            #{order.orderNumber}
          </h3>
          <p className="text-xs text-gray-500 font-medium">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <span className="block font-black text-brand-charcoal text-base">
            ₹{(order.pricing?.total || 0).toFixed(2)}
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            {order.orderType}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 rounded-xl p-3 border border-gray-100">
        <div className="col-span-2 flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium truncate">{order.customer?.fullName || 'Unknown'}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-gray-700">
          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium">{order.customer?.phone || 'No phone'}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
        <OrderStatusBadge status={order.orderStatus} />
        <PaymentStatusBadge status={order.paymentStatus} />
      </div>

      <div className="pt-2 flex justify-end">
        <Link 
          href={`/admin/orders/${order.orderNumber}`}
          className="w-full text-center py-2.5 bg-gray-900 text-white font-bold rounded-xl text-sm transition-colors hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
      
    </div>
  );
}
