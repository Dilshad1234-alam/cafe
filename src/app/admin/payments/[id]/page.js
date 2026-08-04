"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, ShoppingBag, User, CheckCircle, Clock, FileText } from 'lucide-react';
import { fetchAdminPaymentDetails } from '@/frontend/services/admin/paymentService';
import { toast } from 'sonner';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    verification_failed: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800"
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
};

export default function AdminPaymentDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();

  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await fetchAdminPaymentDetails(id);
        setPayment(res.data);
      } catch (err) {
        toast.error(err.message || "Failed to load payment details");
        router.push('/admin/payments');
      } finally {
        setIsLoading(false);
      }
    };
    loadDetails();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-charcoal"></div>
      </div>
    );
  }

  if (!payment) return null;

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Payment Details</h1>
              <p className="text-sm text-gray-500 font-medium">Transaction ID: {payment.gatewayPaymentId || payment.id}</p>
            </div>
            <div className="ml-auto flex gap-3">
              <Link
                href={`/admin/orders/${payment.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                View Order
              </Link>
              {payment.paymentStatus === 'paid' && (
                <Link
                  href={`/account/orders/${payment.orderNumber}/invoice`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-charcoal text-white hover:bg-gray-800 rounded-xl transition-colors font-bold text-sm shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  View Receipt
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-brand-charcoal" />
                <h2 className="text-lg font-bold text-gray-900">Transaction Info</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Amount</p>
                  <p className="text-2xl font-black text-gray-900">{formatCurrency(payment.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Status</p>
                  <StatusBadge status={payment.paymentStatus} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Method</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {payment.paymentMethod === 'online' ? 'Razorpay' : payment.paymentMethod.replace(/_/g, ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Gateway Order ID</p>
                  <p className="font-mono text-sm text-gray-900">{payment.gatewayOrderId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Gateway Payment ID</p>
                  <p className="font-mono text-sm text-gray-900">{payment.gatewayPaymentId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Verified Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {payment.verifiedAt ? new Date(payment.verifiedAt).toLocaleString() : 'Not verified'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-brand-charcoal" />
                <h2 className="text-lg font-bold text-gray-900">Verification Integrity</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Signature Verified</p>
                    <p className="text-sm text-gray-500">
                      {payment.paymentMethod === 'online' && payment.paymentStatus === 'paid' 
                        ? 'Payment signature was cryptographically verified server-side.' 
                        : 'Not applicable or not verified.'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Amount Verified</p>
                    <p className="text-sm text-gray-500">
                      {payment.paymentMethod === 'online' && payment.paymentStatus === 'paid' 
                        ? `Amount matches trusted internal order total (${formatCurrency(payment.amount)}).` 
                        : 'Not applicable or not verified.'}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <ShoppingBag className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold text-gray-900">Order Summary</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Number</p>
                  <p className="font-bold text-brand-charcoal">{payment.orderNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
                    {payment.orderStatus?.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Type</p>
                  <p className="capitalize text-gray-900 font-medium">{payment.orderType}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Created At</p>
                  <p className="text-sm text-gray-900">{new Date(payment.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <User className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold text-gray-900">Customer</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Name</p>
                  <p className="font-medium text-gray-900">{payment.customer.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="font-mono text-sm text-gray-900">{payment.customer.phone}</p>
                </div>
                {payment.customer.email && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm text-gray-900">{payment.customer.email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
