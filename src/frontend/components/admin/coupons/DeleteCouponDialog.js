import React, { useState } from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { deleteAdminCoupon } from '@/frontend/services/admin/couponService';
import { toast } from 'sonner';

export default function DeleteCouponDialog({ coupon, onClose, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAdminCoupon(coupon._id);
      toast.success("Coupon deleted successfully");
      onDelete(coupon._id);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete coupon");
      setIsDeleting(false); // Let them try again or cancel if it failed
    }
  };

  const isUsed = coupon.usageCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-brand-red" />
            Delete Coupon
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
            Are you sure you want to permanently delete the coupon <strong className="text-gray-900">{coupon.code}</strong>?
          </p>

          {isUsed ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm border border-red-100 mb-6 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">Cannot Delete Used Coupon</p>
                <p className="opacity-90 leading-relaxed">
                  This coupon has already been used {coupon.usageCount} time{coupon.usageCount !== 1 ? 's' : ''}. Deleting it would break historical order records. Please deactivate it instead.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-sm border border-orange-100 mb-6 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">Warning: Permanent Action</p>
                <p className="opacity-90 leading-relaxed">
                  This action cannot be undone. This coupon has never been used, so it is safe to delete.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex gap-3 mt-6">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors"
              disabled={isDeleting}
            >
              {isUsed ? "Close" : "Cancel"}
            </button>
            
            {!isUsed && (
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDeleting && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
