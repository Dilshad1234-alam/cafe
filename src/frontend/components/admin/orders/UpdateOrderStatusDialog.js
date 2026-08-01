"use client";

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { updateAdminOrderStatus } from '@/frontend/services/admin/orderService';
import { toast } from 'sonner';

export default function UpdateOrderStatusDialog({ order, onClose, onUpdate }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine allowed transitions based on backend rules
  const currentStatus = order.orderStatus;
  const isDelivery = order.orderType === 'delivery';
  
  let validNextStatuses = [];
  
  if (currentStatus === 'placed') validNextStatuses = ['confirmed'];
  else if (currentStatus === 'confirmed') validNextStatuses = ['preparing'];
  else if (currentStatus === 'preparing') validNextStatuses = ['ready'];
  else if (currentStatus === 'ready') validNextStatuses = isDelivery ? ['out_for_delivery'] : ['delivered'];
  else if (currentStatus === 'out_for_delivery') validNextStatuses = ['delivered'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStatus) {
      toast.error("Please select a status");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const updatedOrder = await updateAdminOrderStatus(order.orderNumber, selectedStatus, note);
      toast.success("Status updated successfully");
      onUpdate(updatedOrder);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to update status");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-black text-brand-charcoal">Update Order Status</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-sm font-bold text-gray-500 uppercase mb-3">Current Status: <span className="text-brand-charcoal">{currentStatus}</span></p>
            
            {validNextStatuses.length === 0 ? (
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm font-medium border border-yellow-200">
                No further status transitions are available for this order.
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900">Select New Status</label>
                <div className="grid grid-cols-1 gap-2">
                  {validNextStatuses.map(status => (
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
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-4 h-4 text-brand-charcoal focus:ring-brand-yellow"
                      />
                      <span className="font-bold text-gray-900 capitalize">{status.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {validNextStatuses.length > 0 && (
            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-bold text-gray-900 mb-2">Optional Note</label>
              <textarea 
                id="note"
                rows="2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note to the order timeline..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors resize-none"
              ></textarea>
            </div>
          )}

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
              disabled={isSubmitting || validNextStatuses.length === 0 || !selectedStatus}
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
