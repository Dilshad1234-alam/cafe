import React from 'react';
import { Percent, IndianRupee } from 'lucide-react';

export default function CouponTypeBadge({ discountType, discountValue }) {
  if (discountType === 'percentage') {
    return (
      <div className="flex items-center gap-1.5 bg-brand-yellow/10 px-2.5 py-1 rounded-md text-brand-charcoal border border-brand-yellow/20">
        <Percent className="w-3.5 h-3.5" />
        <span className="text-xs font-black">{discountValue}% OFF</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-md text-green-700 border border-green-100">
      <IndianRupee className="w-3.5 h-3.5" />
      <span className="text-xs font-black">₹{discountValue} OFF</span>
    </div>
  );
}
