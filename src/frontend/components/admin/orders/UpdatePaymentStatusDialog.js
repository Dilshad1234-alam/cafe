"use client";

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { updateAdminPaymentStatus } from '@/frontend/services/admin/orderService';
import { toast } from 'sonner';

export default function UpdatePaymentStatusDialog({ order, onClose, onUpdate }) {
  const [selectedStatus, setSelectedStatus] = useState(order.paymentStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStatus = order.paymentStatus;
  
  // Rule: Cannot change from paid to pending/failed. 
  const availableOptions = ['pending', 'paid', 'failed', 'refunded'].filter(status => {
    if (currentStatus === 'paid' && (status === 'pending' || status === 'failed')) return false;
    return true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStatus) return;
    
    setIsSubmitting(true);
    try {
      const updatedOrder = await updateAdminPaymentStatus(order.orderNumber, selectedStatus);
      toast.success("Payment status updated successfully");
      onUpdate(updatedOrder);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to update payment status");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-black text-brand-charcoal">Update Payment Status</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-sm font-bold text-gray-500 uppercase mb-3">
              Method: <span className="text-brand-charcoal">{order.paymentMethod.replace(/_/g, ' ')}</span>
            </p>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-900">Select Payment Status</label>
              <div className="grid grid-cols-1 gap-2">
                {availableOptions.map(status => (
                  <label 
                    key={status}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedStatus === status 
                        ? 'border-brand-charcoal bg-gray-50' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentStatus"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-4 h-4 text-brand-charcoal focus:ring-brand-yellow"
                    />
                    <span className="font-bold text-gray-900 capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || selectedStatus === currentStatus}
              className="flex-1 px-4 py-3 text-sm font-bold text-white bg-brand-charcoal hover:bg-gray-900 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Updating..." : <><Check className="w-4 h-4" /> Update Status</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
