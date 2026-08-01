import React, { useState } from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { deleteAdminReview } from '@/frontend/services/admin/reviewService';
import { toast } from 'sonner';

export default function DeleteReviewDialog({ review, onClose, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAdminReview(review._id);
      toast.success("Review deleted successfully");
      onDelete(review._id);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete review");
      setIsDeleting(false);
    }
  };

  const isApproved = review.status === 'approved';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-brand-red" />
            Delete Review
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
            Are you sure you want to permanently delete this review from <strong className="text-gray-900">{review.user?.name}</strong>?
          </p>

          <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-sm border border-orange-100 mb-6 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Warning: Permanent Action</p>
              <p className="opacity-90 leading-relaxed">
                This action cannot be undone. 
                {isApproved && " Because this review is approved, deleting it will also recalculate and potentially lower the product's overall rating."}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            
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
          </div>

        </div>
      </div>
    </div>
  );
}
