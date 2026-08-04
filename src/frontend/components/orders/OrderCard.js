import React from 'react';
import Link from 'next/link';
import { Calendar, Package, Receipt, ArrowRight, MapPin, Store } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';

export default function OrderCard({ order }) {
  const { 
    orderNumber, 
    createdAt, 
    orderType, 
    items, 
    pricing, 
    paymentMethod, 
    paymentStatus, 
    orderStatus 
  } = order;

  const dateStr = new Date(createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const firstItems = items.slice(0, 2);
  const remainingCount = items.length > 2 ? items.length - 2 : 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        
        {/* Left Side: Order Info */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-lg text-brand-charcoal">
              #{orderNumber}
            </span>
            <OrderStatusBadge status={orderStatus} />
            <PaymentStatusBadge status={paymentStatus} method={paymentMethod} />
            {orderType === "delivery" ? (
              <span className="flex items-center gap-1 text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                <MapPin className="w-3 h-3" /> Delivery
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-bold bg-orange-50 text-orange-700 px-2 py-1 rounded-md">
                <Store className="w-3 h-3" /> Takeaway
              </span>
            )}
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{dateStr}</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-start gap-2">
              <Package className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-brand-charcoal font-medium">
                  {totalItems} Item{totalItems !== 1 ? 's' : ''}:
                </p>
                <p className="text-sm text-gray-500">
                  {firstItems.map((item, idx) => (
                    <span key={idx}>
                      {item.quantity}x {item.name}{idx < firstItems.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  {remainingCount > 0 && <span> and {remainingCount} more...</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Total & Actions */}
        <div className="flex flex-col lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 min-w-[200px] gap-4">
          <div className="lg:text-right">
            <p className="text-sm text-gray-500 mb-1 flex items-center gap-1 lg:justify-end">
              <Receipt className="w-4 h-4" /> Total Amount
            </p>
            <p className="font-serif text-2xl font-black text-brand-charcoal">
              ₹{pricing.total.toFixed(2)}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row lg:flex-col w-full lg:w-auto gap-2 mt-4 lg:mt-0">
            <Link 
              href={`/account/orders/${orderNumber}/invoice`}
              className="w-full sm:flex-1 lg:w-full px-6 py-3 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              Receipt
            </Link>
            <Link 
              href={`/account/orders/${orderNumber}`}
              className="w-full sm:flex-1 lg:w-full px-6 py-3 bg-white border border-gray-200 text-brand-charcoal rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
