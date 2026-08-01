import React from 'react';
import { ShoppingBag, CheckCircle, XCircle, IndianRupee } from 'lucide-react';

export default function CustomerStats({ stats }) {
  const cards = [
    {
      title: 'Total Spending',
      value: `₹${(stats.totalSpending || 0).toFixed(2)}`,
      subtitle: 'From delivered orders',
      icon: IndianRupee,
      color: 'bg-brand-yellow/10',
      iconColor: 'text-brand-charcoal',
      textColor: 'text-gray-900'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders || 0,
      subtitle: 'All time orders',
      icon: ShoppingBag,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-900'
    },
    {
      title: 'Delivered',
      value: stats.deliveredOrdersCount || 0,
      subtitle: 'Successfully completed',
      icon: CheckCircle,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      textColor: 'text-green-700'
    },
    {
      title: 'Cancelled',
      value: stats.cancelledOrdersCount || 0,
      subtitle: 'Cancelled orders',
      icon: XCircle,
      color: 'bg-red-50',
      iconColor: 'text-red-500',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
              {card.title}
            </p>
            <h3 className={`text-2xl sm:text-3xl font-black ${card.textColor}`}>
              {card.value}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">
              {card.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
