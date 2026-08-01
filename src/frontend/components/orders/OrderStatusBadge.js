import React from 'react';

const statusConfig = {
  placed: { label: "Placed", color: "bg-blue-100 text-blue-800" },
  confirmed: { label: "Confirmed", color: "bg-indigo-100 text-indigo-800" },
  preparing: { label: "Preparing", color: "bg-brand-yellow/20 text-brand-charcoal" },
  ready: { label: "Ready", color: "bg-orange-100 text-orange-800" },
  out_for_delivery: { label: "Out for Delivery", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

export default function OrderStatusBadge({ status }) {
  const config = statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-800" };
  
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
}
