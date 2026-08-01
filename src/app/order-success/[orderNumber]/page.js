"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchOrderByNumber } from "@/frontend/services/orderService";
import { useAuth } from "@/frontend/hooks/useAuth";

export default function OrderSuccessPage({ params }) {
  const unwrappedParams = use(params);
  const { orderNumber } = unwrappedParams;
  const searchParams = useSearchParams();
  const guestToken = searchParams.get("guestToken");
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Wait for auth to resolve before fetching to pass cookies properly
    if (authLoading) return;

    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderByNumber(orderNumber, guestToken);
        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderNumber, guestToken, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ⚠️
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "We couldn't load this order. You might not have permission to view it."}</p>
          <Link href="/" className="block w-full py-3 bg-brand-charcoal text-white rounded-xl font-bold">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-green-50 p-8 text-center border-b border-green-100">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-md">
              ✓
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-green-800 font-medium">Your order has been received and is awaiting confirmation.</p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="flex flex-wrap justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Order Number</p>
                <p className="text-lg font-bold text-gray-900">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Date & Time</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Order Type</p>
                <p className="text-lg font-bold capitalize text-gray-900">{order.orderType}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
              <div>
                <h3 className="text-lg font-bold mb-4 border-b pb-2">Customer Details</h3>
                <p className="font-medium text-gray-900 mb-1">{order.customer.fullName}</p>
                <p className="text-gray-600 mb-1">{order.customer.phone}</p>
                {order.customer.email && <p className="text-gray-600">{order.customer.email}</p>}
                
                {order.orderType === "delivery" && order.deliveryAddress && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 font-medium mb-1">Delivery Address</p>
                    <p className="text-gray-800">
                      {order.deliveryAddress.house}, {order.deliveryAddress.area}<br />
                      {order.deliveryAddress.landmark && <>{order.deliveryAddress.landmark}<br /></>}
                      {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 border-b pb-2">Payment Details</h3>
                <p className="mb-2">
                  <span className="text-gray-500 mr-2">Method:</span>
                  <span className="font-semibold capitalize text-gray-900">
                    {order.paymentMethod.replace(/_/g, " ")}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500 mr-2">Status:</span>
                  <span className={`font-semibold capitalize px-2 py-1 rounded text-sm ${
                    order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6">Order Items</h3>
            <div className="space-y-4 mb-8">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-4 border-b border-gray-50">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{item.name}</p>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-500 mt-1">Size: {item.selectedSize.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Add-ons: {item.selectedAddOns.map(a => a.name).join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="text-center px-6">
                    <p className="text-gray-600">x{item.quantity}</p>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold">₹{item.itemTotal}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex justify-between mb-3 text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.pricing.subtotal}</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{order.pricing.deliveryFee}</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-600">
                <span>Tax</span>
                <span>₹{order.pricing.tax}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200 text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-brand-red">₹{order.pricing.total}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="p-8 bg-gray-50 flex flex-col sm:flex-row gap-4 border-t border-gray-100">
            <Link 
              href="/" 
              className="flex-1 text-center py-4 bg-white border-2 border-brand-charcoal text-brand-charcoal rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
            {isAuthenticated && (
              <Link 
                href="/account/orders" 
                className="flex-1 text-center py-4 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                My Orders
              </Link>
            )}
            <a 
              href={`https://wa.me/91XXXXXXXXXX?text=Hi, I have a question about my order ${order.orderNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 text-center py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-colors"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
