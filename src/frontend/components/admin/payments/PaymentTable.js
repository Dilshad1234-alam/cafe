"use client";

import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';

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

export default function PaymentTable({ payments }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden lg:block">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Transaction ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Order</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Method</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-mono text-sm text-gray-900">
                    {payment.gatewayPaymentId || `N/A`}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/orders/${payment.orderNumber}`} className="font-bold text-brand-charcoal hover:text-brand-red transition-colors">
                    {payment.orderNumber}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{payment.customer.name}</div>
                  <div className="text-sm text-gray-500">{payment.customer.phone}</div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {payment.paymentMethod === 'online' ? 'Razorpay' : payment.paymentMethod.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={payment.paymentStatus} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/payments/${payment.id}`}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-charcoal bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
