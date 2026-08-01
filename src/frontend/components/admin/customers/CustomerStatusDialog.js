import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { updateAdminCustomerStatus } from '@/frontend/services/admin/customerService';
import { toast } from 'sonner';

export default function CustomerStatusDialog({ customer, onClose, onUpdate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCurrentlyActive = customer.isActive;
  const newStatus = !isCurrentlyActive;
  
  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const updated = await updateAdminCustomerStatus(customer._id, newStatus);
      toast.success(`Customer account has been ${newStatus ? 'activated' : 'deactivated'}`);
      onUpdate(updated);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update customer status");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            {newStatus ? (
              <ShieldCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-brand-red" />
            )}
            {newStatus ? 'Activate Account' : 'Deactivate Account'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to <strong>{newStatus ? 'activate' : 'deactivate'}</strong> the account for <strong className="text-gray-900">{customer.fullname}</strong>?
          </p>
          
          {newStatus ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-sm border border-green-100 mb-6">
              <p className="font-medium">When activated:</p>
              <ul className="list-disc ml-5 mt-1 opacity-90 space-y-0.5">
                <li>The user will be able to log in again.</li>
                <li>They can place new orders.</li>
                <li>Their account functions normally.</li>
              </ul>
            </div>
          ) : (
            <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm border border-red-100 mb-6">
              <p className="font-medium">When deactivated:</p>
              <ul className="list-disc ml-5 mt-1 opacity-90 space-y-0.5">
                <li>The user will be blocked from logging in.</li>
                <li>They cannot place new orders or access their account.</li>
                <li>Existing orders will remain unaffected.</li>
              </ul>
            </div>
          )}
          
          <div className="flex gap-3 mt-6">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              disabled={isSubmitting}
              className={`flex-1 py-2.5 px-4 text-white font-bold rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2 ${
                newStatus 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-brand-red hover:bg-red-700'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
              {isSubmitting ? 'Updating...' : `Yes, ${newStatus ? 'Activate' : 'Deactivate'}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
