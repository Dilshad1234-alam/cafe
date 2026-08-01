import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Store, MapPin } from 'lucide-react';

export default function RecentOrders({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
        <p className="text-gray-500 py-4">No recent orders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-black text-brand-charcoal">Recent Orders</h3>
        <Link 
          href="/admin/orders"
          className="text-sm font-bold text-brand-yellow hover:text-[#E5A800] transition-colors flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderNumber} className="flex flex-col sm:flex-row justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4 hover:border-gray-200 transition-colors">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Link href={`/admin/orders/${order.orderNumber}`} className="font-bold text-brand-charcoal hover:underline">
                  #{order.orderNumber}
                </Link>
                <span className="text-xs font-bold px-2 py-1 bg-white border border-gray-200 rounded-md capitalize">
                  {order.orderStatus}
                </span>
                {order.orderType === 'delivery' ? (
                  <MapPin className="w-4 h-4 text-blue-500" />
                ) : (
                  <Store className="w-4 h-4 text-orange-500" />
                )}
              </div>
              <p className="text-sm font-bold text-gray-700">{order.customer?.fullName || "Guest"}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3" />
                {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })}
              </div>
            </div>
            
            <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between">
              <p className="font-black text-brand-charcoal">₹{order.pricing?.total?.toFixed(2) || "0.00"}</p>
              <span className={`text-xs font-bold capitalize mt-1 ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-500'}`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
