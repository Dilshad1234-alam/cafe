import React, { useState } from 'react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { moderateAdminReview } from '@/frontend/services/admin/reviewService';
import RatingStars from './RatingStars';
import ReviewStatusBadge from './ReviewStatusBadge';
import { toast } from 'sonner';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function ReviewModerationDialog({ review, onClose, onUpdate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminNote, setAdminNote] = useState(review.adminNote || '');

  const handleModerate = async (newStatus) => {
    if (!newStatus) return;
    
    setIsSubmitting(true);
    try {
      const updated = await moderateAdminReview(review._id, newStatus, adminNote);
      toast.success(`Review ${newStatus === 'approved' ? 'Approved' : 'Rejected'} successfully`);
      onUpdate(updated);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || `Failed to ${newStatus} review`);
      setIsSubmitting(false); // keep note around if it failed
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-gray-900 text-lg">
            Review Moderation
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Customer</span>
              <div className="font-black text-gray-900 truncate">{review.user?.name}</div>
              <div className="text-sm text-gray-500 truncate">{review.user?.email}</div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Product</span>
              <div className="flex items-center gap-3">
                {review.product?.imageUrl && (
                  <img src={review.product.imageUrl} alt={review.product.name} className="w-8 h-8 rounded-lg object-cover" />
                )}
                <span className="font-bold text-gray-900 truncate">{review.product?.name}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <RatingStars rating={review.rating} className="w-5 h-5" />
              <ReviewStatusBadge status={review.status} />
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {review.comment}
              </p>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-right">
              Submitted on {formatDate(review.createdAt)}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between items-center">
              Admin Note
              <span className="text-xs font-medium text-gray-400">(Optional, internal only)</span>
            </label>
            <textarea 
              rows="3"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="e.g. Verified with customer support..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-colors resize-none"
              maxLength={500}
            />
            {review.moderatedBy && (
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Previously moderated by {review.moderatedBy.name} on {formatDate(review.moderatedAt)}
              </p>
            )}
          </div>

        </div>

        <div className="p-5 border-t border-gray-100 shrink-0 bg-gray-50 flex gap-3 justify-end items-center">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          
          <button 
            onClick={() => handleModerate('rejected')}
            disabled={isSubmitting || review.status === 'rejected'}
            className="px-5 py-2.5 bg-white border border-brand-red text-brand-red hover:bg-red-50 font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>

          <button 
            onClick={() => handleModerate('approved')}
            disabled={isSubmitting || review.status === 'approved'}
            className="px-5 py-2.5 bg-brand-charcoal hover:bg-gray-800 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Approve
          </button>
        </div>

      </div>
    </div>
  );
}
