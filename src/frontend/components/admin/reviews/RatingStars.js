import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating, maxRating = 5, className = "w-4 h-4" }) {
  const safeRating = Math.max(1, Math.min(maxRating, Math.floor(rating || 1)));
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxRating)].map((_, i) => (
        <Star 
          key={i} 
          className={`${className} ${
            i < safeRating ? 'fill-brand-yellow text-brand-yellow drop-shadow-sm' : 'fill-gray-100 text-gray-200'
          }`} 
        />
      ))}
    </div>
  );
}
