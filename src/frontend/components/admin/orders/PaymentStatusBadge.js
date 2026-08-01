import React from 'react';
import { CheckCircle2, Clock, AlertCircle, RefreshCcw } from 'lucide-react';

const paymentStatusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: Clock
  },
  paid: {
    label: "Paid",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle2
  },
  failed: {
    label: "Failed",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: AlertCircle
  },
  refunded: {
    label: "Refunded",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: RefreshCcw
  }
};

export default function PaymentStatusBadge({ status, className = "" }) {
  const config = paymentStatusConfig[status] || {
    label: status,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: AlertCircle
  };
  
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${config.color} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
