"use client";

import React from 'react';
import Link from 'next/link';
import { Eye, CreditCard } from 'lucide-react';

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

export default function PaymentMobileCard({ payment }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Amount</span>
          <span className="text-xl font-bold text-gray-900">{formatCurrency(payment.amount)}</span>
        </div>
        <StatusBadge status={payment.paymentStatus} />
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Transaction ID</span>
          <span className="font-mono text-gray-900">{payment.gatewayPaymentId || 'N/A'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order</span>
          <Link href={`/admin/orders/${payment.orderNumber}`} className="font-bold text-brand-charcoal">
            {payment.orderNumber}
          </Link>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Method</span>
          <span className="font-medium text-gray-900 capitalize">
            {payment.paymentMethod === 'online' ? 'Razorpay' : payment.paymentMethod.replace(/_/g, ' ')}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date</span>
          <span className="text-gray-900">{new Date(payment.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <Link
          href={`/admin/payments/${payment.id}`}
          className="flex justify-center items-center gap-2 w-full py-3 text-sm font-bold text-brand-charcoal bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );
}
