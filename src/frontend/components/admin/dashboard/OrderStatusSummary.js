import React from 'react';

export default function OrderStatusSummary({ pending, completed, cancelled, total }) {
  if (total === 0) return null;

  const pendingPct = Math.round((pending / total) * 100) || 0;
  const completedPct = Math.round((completed / total) * 100) || 0;
  const cancelledPct = Math.round((cancelled / total) * 100) || 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-serif text-xl font-black text-brand-charcoal mb-6">Status Overview</h3>
      
      <div className="space-y-4">
        {/* Pending */}
        <div>
          <div className="flex justify-between text-sm mb-1 font-bold">
            <span className="text-yellow-600">Pending</span>
            <span>{pending} ({pendingPct}%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${pendingPct}%` }}></div>
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="flex justify-between text-sm mb-1 font-bold">
            <span className="text-green-600">Completed</span>
            <span>{completed} ({completedPct}%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completedPct}%` }}></div>
          </div>
        </div>

        {/* Cancelled */}
        <div>
          <div className="flex justify-between text-sm mb-1 font-bold">
            <span className="text-red-600">Cancelled</span>
            <span>{cancelled} ({cancelledPct}%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-red-400 h-2 rounded-full" style={{ width: `${cancelledPct}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
