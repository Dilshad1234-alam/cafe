import React from 'react';
import { formatDate } from '@/frontend/utils/dateHelpers';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderTimeline({ history }) {
  if (!history || history.length === 0) return null;

  // Sort history newest first for display
  const sortedHistory = [...history].sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt));

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
      <h2 className="text-lg font-black text-brand-charcoal mb-6">Order Timeline</h2>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        {sortedHistory.map((entry, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-gray-100 text-gray-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
              <div className="w-2 h-2 rounded-full bg-brand-charcoal"></div>
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <OrderStatusBadge status={entry.status} />
                <time className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                  {formatDate(entry.changedAt)}
                </time>
              </div>
              
              <div className="text-xs font-medium text-gray-600 mb-1">
                Updated by <span className="font-bold text-gray-900">{entry.changedBy || 'System'}</span>
              </div>
              
              {entry.note && (
                <div className="text-sm font-medium text-gray-700 mt-2 bg-white p-3 rounded-xl border border-gray-100">
                  {entry.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
