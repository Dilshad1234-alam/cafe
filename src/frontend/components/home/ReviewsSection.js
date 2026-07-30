import { reviews } from "@/frontend/data/reviews";
import { Star, Quote } from "lucide-react";

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-charcoal mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here is what Gondia foodies have to say about us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-brand-yellow/10 border border-gray-100 transition-all duration-300 relative flex flex-col"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100 rotate-180" />
              
              <div className="flex text-brand-yellow mb-4" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? "fill-brand-yellow" : "text-gray-200 fill-gray-200"}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic mb-6 flex-grow relative z-10 text-sm leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center font-bold text-brand-charcoal">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-charcoal">{review.name}</h4>
                  <p className="text-xs text-brand-red font-medium">Ordered: {review.orderItem}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
