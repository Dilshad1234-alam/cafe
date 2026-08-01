import React from 'react';

export default function DashboardStatCard({ title, value, subtitle, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  const iconClass = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
      {Icon && (
        <div className={`p-4 rounded-2xl shrink-0 ${iconClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div>
        <p className="text-sm font-bold text-gray-500 mb-1">{title}</p>
        <h3 className="font-serif text-3xl font-black text-brand-charcoal">{value}</h3>
        {subtitle && (
          <p className="text-xs font-medium text-gray-400 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
