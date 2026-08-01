import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function PopularProducts({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-black text-brand-charcoal">Top Products</h3>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {products.map((product, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                {idx + 1}
              </span>
              <p className="font-bold text-sm text-gray-800">{product.name}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-brand-charcoal">{product.count} sold</p>
              <p className="text-xs font-medium text-gray-500">₹{product.revenue?.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
