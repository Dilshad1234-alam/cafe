"use client";

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { updateAdminOrderStatus } from '@/frontend/services/admin/orderService';
import { toast } from 'sonner';

export default function CancelOrderDialog({ order, onClose, onUpdate }) {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPreparing = order.orderStatus === 'preparing';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPreparing && !note.trim()) {
      toast.error("Cancellation reason is required when cancelling a preparing order");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const updatedOrder = await updateAdminOrderStatus(order.orderNumber, 'cancelled', note);
      toast.success("Order cancelled successfully");
      onUpdate(updatedOrder);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to cancel order");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-black text-brand-red flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Cancel Order
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Are you sure you want to cancel order <span className="font-bold text-gray-900">#{order.orderNumber}</span>? This action cannot be undone.
            </p>
            
            <label htmlFor="cancel-reason" className="block text-sm font-bold text-gray-900 mb-2">
              Cancellation Reason {isPreparing && <span className="text-brand-red">*</span>}
            </label>
            <textarea 
              id="cancel-reason"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={isPreparing ? "Reason is required (e.g. Out of stock, Customer requested)..." : "Optional reason..."}
              required={isPreparing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors resize-none"
            ></textarea>
            {isPreparing && (
              <p className="text-xs text-brand-red font-medium mt-2">
                Order is already preparing, reason is mandatory.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Keep Order
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (isPreparing && !note.trim())}
              className="flex-1 px-4 py-3 text-sm font-bold text-white bg-brand-red hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Cancelling..." : "Yes, Cancel Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
