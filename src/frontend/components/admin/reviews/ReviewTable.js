import React, { useState } from 'react';
import { Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import ReviewStatusBadge from './ReviewStatusBadge';
import RatingStars from './RatingStars';
import DeleteReviewDialog from './DeleteReviewDialog';
import ReviewModerationDialog from './ReviewModerationDialog';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function ReviewTable({ reviews, onReviewUpdate, onReviewDelete }) {
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewToModerate, setReviewToModerate] = useState(null);

  return (
    <>
      <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 pl-6">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Rating</th>
              <th className="p-4 w-1/3">Comment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Submitted</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50/50 transition-colors">
                
                <td className="p-4 pl-6 align-middle">
                  <div className="flex flex-col max-w-[150px]">
                    <span className="font-bold text-gray-900 truncate" title={review.user?.name}>
                      {review.user?.name || 'Unknown'}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium truncate mt-0.5" title={review.user?.email}>
                      {review.user?.email || ''}
                    </span>
                  </div>
                </td>

                <td className="p-4 align-middle max-w-[150px]">
                  <div className="flex items-center gap-2">
                    {review.product?.imageUrl && (
                      <img src={review.product.imageUrl} alt={review.product.name} className="w-6 h-6 rounded object-cover" />
                    )}
                    <span className="font-medium text-gray-800 text-sm truncate" title={review.product?.name}>
                      {review.product?.name || 'Unknown'}
                    </span>
                  </div>
                </td>

                <td className="p-4 align-middle">
                  <RatingStars rating={review.rating} />
                </td>

                <td className="p-4 align-middle">
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed" title={review.comment}>
                    {review.comment}
                  </p>
                </td>

                <td className="p-4 align-middle">
                  <ReviewStatusBadge status={review.status} />
                </td>

                <td className="p-4 align-middle">
                  <span className="text-sm font-medium text-gray-700">
                    {formatDate(review.createdAt)}
                  </span>
                </td>

                <td className="p-4 align-middle text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => setReviewToModerate(review)}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-brand-charcoal text-xs font-bold rounded-xl hover:border-brand-yellow hover:text-brand-yellow transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>

                    <button 
                      onClick={() => setReviewToDelete(review)}
                      className="p-1.5 bg-white border border-gray-200 text-gray-400 rounded-xl hover:border-brand-red hover:text-brand-red transition-colors shadow-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
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
