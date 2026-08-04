"use client";

import React from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function PaymentSummaryCards({ summary }) {
  const cards = [
    {
      title: "Total Collected",
      value: formatCurrency(summary.totalCollected),
      subtitle: `${summary.totalTransactions} Total Transactions`,
      icon: CreditCard,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 text-blue-700"
    },
    {
      title: "Today's Collection",
      value: formatCurrency(summary.todayCollected),
      subtitle: "Verified Payments Today",
      icon: CheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50 text-green-700"
    },
    {
      title: "Pending Payments",
      value: (summary.pendingPayments + summary.codPickupPending).toString(),
      subtitle: "Awaiting Verification/Collection",
      icon: Clock,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50 text-yellow-700"
    },
    {
      title: "Failed Payments",
      value: summary.failedPayments.toString(),
      subtitle: "Unsuccessful Transactions",
      icon: AlertCircle,
      color: "bg-red-500",
      bgColor: "bg-red-50 text-red-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className={`p-4 rounded-xl ${card.bgColor} shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
