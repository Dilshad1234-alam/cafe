import React, { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import ReviewStatusBadge from './ReviewStatusBadge';
import RatingStars from './RatingStars';
import DeleteReviewDialog from './DeleteReviewDialog';
import ReviewModerationDialog from './ReviewModerationDialog';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function ReviewMobileCard({ review, onReviewUpdate, onReviewDelete }) {
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewToModerate, setReviewToModerate] = useState(null);

  return (
    <>
      <div className="lg:hidden bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative flex flex-col gap-3">
        
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 truncate max-w-[200px]">
              {review.user?.name || 'Unknown'}
            </span>
            <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
          </div>
          <ReviewStatusBadge status={review.status} />
        </div>

        <div className="flex items-center gap-2 bg-gray-50/80 p-2 rounded-xl">
          {review.product?.imageUrl && (
            <img src={review.product.imageUrl} alt={review.product.name} className="w-8 h-8 rounded-lg object-cover" />
          )}
          <span className="font-bold text-gray-800 text-sm truncate">
            {review.product?.name || 'Unknown Product'}
          </span>
        </div>

        <div>
          <RatingStars rating={review.rating} className="w-4 h-4 mb-1.5" />
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {review.comment}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-3 mt-1 border-t border-gray-100 items-center justify-between">
          <button 
            onClick={() => setReviewToModerate(review)}
            className="flex-1 px-3 py-2 bg-white border border-gray-200 text-brand-charcoal text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Moderate
          </button>
          
          <button 
            onClick={() => setReviewToDelete(review)}
            className="p-2 bg-white border border-gray-200 text-gray-400 rounded-xl hover:border-brand-red hover:text-brand-red transition-colors shadow-sm"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
      </div>

      {reviewToModerate && (
        <ReviewModerationDialog 
          review={reviewToModerate} 
          onClose={() => setReviewToModerate(null)}
          onUpdate={onReviewUpdate}
        />
      )}

      {reviewToDelete && (
        <DeleteReviewDialog 
          review={reviewToDelete} 
          onClose={() => setReviewToDelete(null)}
          onDelete={(id) => {
            onReviewDelete(id);
            setReviewToDelete(null);
          }}
        />
      )}
    </>
  );
}
