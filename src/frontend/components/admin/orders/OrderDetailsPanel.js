import React from 'react';
import { User, Phone, Mail, MapPin, Navigation } from 'lucide-react';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function OrderDetailsPanel({ order }) {
  const isDelivery = order.orderType === 'delivery';

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
      <h2 className="text-lg font-black text-brand-charcoal mb-4">Customer & Order Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
        {/* Customer Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Customer Name</p>
              <p className="font-bold text-gray-900">{order.customer.fullName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Phone Number</p>
              <p className="font-bold text-gray-900">{order.customer.phone}</p>
            </div>
          </div>

          {order.customer.email && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase">Email Address</p>
                <p className="font-bold text-gray-900">{order.customer.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Order Type</p>
              <p className="font-bold text-gray-900 capitalize">{order.orderType}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">
                {isDelivery ? "Delivery Address" : "Pickup Details"}
              </p>
              {isDelivery ? (
                <div className="text-sm font-medium text-gray-900 mt-1">
                  <p>{order.deliveryAddress.house}, {order.deliveryAddress.area}</p>
                  <p>{order.deliveryAddress.landmark && `Landmark: ${order.deliveryAddress.landmark}`}</p>
                  <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                  {order.deliveryAddress.label && (
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase bg-gray-100 px-2 py-0.5 rounded">
                      {order.deliveryAddress.label}
                    </span>
                  )}
                </div>
              ) : (
                <p className="font-bold text-gray-900 mt-1">Self Pickup from The Tasty Zone Cafe</p>
              )}
            </div>
          </div>
          
          {order.notes && (
            <div className="pt-2">
              <p className="text-sm font-bold text-gray-500 uppercase mb-1">Order Notes</p>
              <p className="text-sm font-medium text-gray-700 bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                {order.notes}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
