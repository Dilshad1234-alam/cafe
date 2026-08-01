import React from 'react';

const statusConfig = {
  pending: { label: "Pending", color: "bg-orange-100 text-orange-800" },
  paid: { label: "Paid", color: "bg-green-100 text-green-800" },
  failed: { label: "Failed", color: "bg-red-100 text-red-800" },
  refunded: { label: "Refunded", color: "bg-gray-100 text-gray-800" },
};

export default function PaymentStatusBadge({ status, method }) {
  // For cash on delivery or pay at pickup, 'pending' is standard and not a warning
  let config = statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-800" };
  
  if (status === "pending" && (method === "cash_on_delivery" || method === "pay_at_pickup")) {
    config = { label: "To be Paid", color: "bg-blue-100 text-blue-800" };
  }

  return (
    <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md ${config.color}`}>
      {config.label}
    </span>
  );
}
