"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchAdminReviews } from '@/frontend/services/admin/reviewService';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import ReviewToolbar from '@/frontend/components/admin/reviews/ReviewToolbar';
import ReviewFilters from '@/frontend/components/admin/reviews/ReviewFilters';
import ReviewTable from '@/frontend/components/admin/reviews/ReviewTable';
import ReviewMobileCard from '@/frontend/components/admin/reviews/ReviewMobileCard';
import ReviewsSkeleton from '@/frontend/components/admin/reviews/ReviewsSkeleton';
import ReviewsEmptyState from '@/frontend/components/admin/reviews/ReviewsEmptyState';
import Pagination from '@/frontend/components/common/Pagination';
import { toast } from 'sonner';

export default function AdminReviewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const data = await fetchAdminReviews(params);
      setReviews(data.reviews);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = Array.from(searchParams.entries()).some(([key, val]) => 
    key !== 'page' && key !== 'limit' && val !== 'all' && val !== ''
  );

  const handleReviewUpdate = (updatedReview) => {
    setReviews((prev) => 
      prev.map((r) => r._id === updatedReview._id ? updatedReview : r)
    );
  };

  const handleReviewDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r._id !== id));
    if (reviews.length === 1 && pagination?.page > 1) {
      handlePageChange(pagination.page - 1);
    } else {
      loadReviews();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <AdminPageHeader 
        title="Review Moderation" 
        subtitle="Approve or reject customer reviews before they appear publicly"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewToolbar totalReviews={pagination?.total || 0} />
        <ReviewFilters />

        {isLoading ? (
          <ReviewsSkeleton />
        ) : reviews.length === 0 ? (
          <ReviewsEmptyState hasFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
        ) : (
          <>
            <ReviewTable 
              reviews={reviews} 
              onReviewUpdate={handleReviewUpdate} 
              onReviewDelete={handleReviewDelete}
            />
            
            <div className="lg:hidden flex flex-col gap-4">
              {reviews.map((review) => (
                <ReviewMobileCard 
                  key={review._id} 
                  review={review} 
                  onReviewUpdate={handleReviewUpdate}
                  onReviewDelete={handleReviewDelete}
                />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination 
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
