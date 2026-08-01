import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

const deliveryStages = [
  { id: 'placed', label: 'Placed' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'ready', label: 'Ready' },
  { id: 'out_for_delivery', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' }
];

const takeawayStages = [
  { id: 'placed', label: 'Placed' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'ready', label: 'Ready' },
  { id: 'delivered', label: 'Collected' } // 'delivered' mapped to Collected for takeaway
];

export default function OrderTimeline({ order }) {
  const { orderStatus, orderType, statusHistory } = order;
  const isCancelled = orderStatus === 'cancelled';
  const stages = orderType === 'takeaway' ? takeawayStages : deliveryStages;

  // Determine current active index
  let currentIndex = stages.findIndex(s => s.id === orderStatus);
  if (currentIndex === -1 && !isCancelled) {
    currentIndex = 0;
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8">
      <h3 className="font-serif text-xl font-black text-brand-charcoal mb-6">Order Timeline</h3>
      
      {isCancelled ? (
        <div className="flex items-center gap-4 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
          <CheckCircle2 className="w-6 h-6" />
          <p className="font-bold">This order was cancelled.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line connecting nodes */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100 rounded-full hidden sm:block"></div>
          
          <div className="flex flex-col gap-6">
            {stages.map((stage, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isPending = index > currentIndex;
              
              // Find history timestamp if available
              const historyItem = statusHistory?.find(h => h.status === stage.id);
              let timeStr = "";
              if (historyItem?.changedAt) {
                timeStr = new Date(historyItem.changedAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true });
              }

              return (
                <div key={stage.id} className="relative flex items-start gap-4">
                  {/* Icon Node */}
                  <div className="relative z-10 bg-white sm:bg-transparent">
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-green-500 fill-green-50" />
                    ) : isCurrent ? (
                      <Clock className="w-8 h-8 text-brand-yellow fill-yellow-50" />
                    ) : (
                      <Circle className="w-8 h-8 text-gray-200" />
                    )}
                  </div>
                  
                  {/* Stage Text */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full pt-1">
                    <p className={`font-bold ${isCurrent ? 'text-brand-charcoal text-lg' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                      {stage.label}
                    </p>
                    {timeStr && (
                      <p className="text-sm text-gray-500 mt-1 sm:mt-0 font-medium">
                        {timeStr}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
