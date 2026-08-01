import React from 'react';

const statusConfig = {
  placed: { label: "Placed", color: "bg-blue-100 text-blue-800 border-blue-200" },
  confirmed: { label: "Confirmed", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  preparing: { label: "Preparing", color: "bg-brand-yellow/30 text-brand-charcoal border-brand-yellow" },
  ready: { label: "Ready", color: "bg-orange-100 text-orange-800 border-orange-200" },
  out_for_delivery: { label: "Out for Delivery", color: "bg-purple-100 text-purple-800 border-purple-200" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800 border-green-200" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200" },
};

export default function OrderStatusBadge({ status, className = "" }) {
  const config = statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-800 border-gray-200" };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border ${config.color} ${className}`}>
      {config.label}
    </span>
  );
}
