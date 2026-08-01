import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Phone, Mail, MapPin } from "lucide-react";
import { requireAuthenticatedUser } from "@/backend/middleware/auth";
import { getOrderByNumber } from "@/backend/services/orderService";
import OrderTimeline from "@/frontend/components/orders/OrderTimeline";
import OrderDetailsSummary from "@/frontend/components/orders/OrderDetailsSummary";
import OrderStatusBadge from "@/frontend/components/orders/OrderStatusBadge";
import PaymentStatusBadge from "@/frontend/components/orders/PaymentStatusBadge";

export const metadata = {
  title: "Order Details | The Tasty Zone Cafe",
};

export default async function OrderDetailsPage({ params }) {
  // Await the params before using its properties in Next.js App Router (Next 15+ standard)
  const { orderNumber } = await params;

  // 1. Authenticate user
  const user = await requireAuthenticatedUser();

  // 2. Fetch order directly via backend service for server-rendering
  let order;
  try {
    order = await getOrderByNumber(orderNumber, user);
  } catch (error) {
    // If access is denied (trying to view someone else's order)
    return notFound();
  }

  // If order simply doesn't exist
  if (!order) {
    return notFound();
  }

  // Safe formatting
  const dateStr = new Date(order.createdAt).toLocaleString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Actions */}
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

        {/* Title Section */}
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

        {/* Timeline */}
        <OrderTimeline order={order} />

        {/* Order Details & Customer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Customer Details */}
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

          {/* Delivery or Pickup Details */}
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

        {/* Order Items & Pricing */}
        <OrderDetailsSummary order={order} />

      </div>
    </main>
  );
}
