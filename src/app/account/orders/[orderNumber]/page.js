"use client";
import { useEffect, useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import OrderTimeline from "@/frontend/components/orders/OrderTimeline";
import OrderDetailsSummary from "@/frontend/components/orders/OrderDetailsSummary";
import OrderStatusBadge from "@/frontend/components/orders/OrderStatusBadge";
import PaymentStatusBadge from "@/frontend/components/orders/PaymentStatusBadge";
import AccountRouteGuard from "@/frontend/components/account/AccountRouteGuard";
import { fetchMyOrderDetails } from "@/frontend/services/orderService";

export default function OrderDetailsPage({ params }) {
  const { orderNumber } = use(params);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await fetchMyOrderDetails(orderNumber);
        if (data.order) {
          setOrder(data.order);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <AccountRouteGuard>
        <main className="min-h-screen bg-gray-50 pt-24 pb-20 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-brand-yellow" />
        </main>
      </AccountRouteGuard>
    );
  }

  if (error || !order) {
    return (
      <AccountRouteGuard>
        <main className="min-h-screen bg-gray-50 pt-24 pb-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find this order in your account.</p>
          <Link href="/account/orders" className="px-6 py-3 bg-brand-yellow text-brand-charcoal font-bold rounded-xl hover:bg-yellow-400 transition-colors">
            Back to Orders
          </Link>
        </main>
      </AccountRouteGuard>
    );
  }

  const dateStr = new Date(order.createdAt).toLocaleString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  });

  return (
    <AccountRouteGuard>
      <main className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link 
              href="/account/orders"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-charcoal transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Orders
            </Link>
            <div className="flex gap-3">
              <Link href="/menu" className="px-5 py-2.5 bg-white border border-gray-200 text-brand-charcoal rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-charcoal mb-2">
                Order #{order.orderNumber}
              </h1>
              <p className="text-gray-500 font-medium">Placed on {dateStr}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <OrderStatusBadge status={order.orderStatus} />
              <PaymentStatusBadge status={order.paymentStatus} method={order.paymentMethod} />
              <span className="px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full uppercase tracking-wider">
                {order.orderType}
              </span>
            </div>
          </div>

          <OrderTimeline order={order} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-serif text-xl font-black text-brand-charcoal mb-6">Customer Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 text-brand-charcoal font-bold">
                    {order.customer.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-brand-charcoal">{order.customer.fullName}</p>
                    <p className="text-sm flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" /> {order.customer.phone}
                    </p>
                    {order.customer.email && (
                      <p className="text-sm flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {order.customer.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-serif text-xl font-black text-brand-charcoal mb-6">
                {order.orderType === 'delivery' ? 'Delivery Address' : 'Pickup Information'}
              </h3>
              {order.orderType === 'delivery' && order.deliveryAddress ? (
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                  <div className="text-sm space-y-1">
                    <p><span className="font-bold text-brand-charcoal">{order.deliveryAddress.house}</span>, {order.deliveryAddress.area}</p>
                    {order.deliveryAddress.landmark && <p>Landmark: {order.deliveryAddress.landmark}</p>}
                    <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                    {order.deliveryAddress.label && (
                      <span className="inline-block mt-2 px-2 py-1 bg-gray-100 rounded-md text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {order.deliveryAddress.label}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 text-gray-600">
                  <ShoppingBag className="w-5 h-5 mt-0.5 text-gray-400" />
                  <div className="text-sm space-y-1">
                    <p className="font-bold text-brand-charcoal">The Tasty Zone Cafe</p>
                    <p>123 Cafe Street, Food District</p>
                    <p>Please present your order number at the counter to collect your order.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <OrderDetailsSummary order={order} />

        </div>
      </main>
    </AccountRouteGuard>
  );
}
