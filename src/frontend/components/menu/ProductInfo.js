import { Star, Clock, AlertCircle } from "lucide-react";

export default function ProductInfo({ product }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal">{product.name}</h1>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
        <div className="flex items-center gap-1 bg-brand-yellow/10 px-2 py-1 rounded text-brand-charcoal font-bold">
          <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
          <span>{product.rating}</span>
          <span className="text-gray-500 font-normal">({product.reviewCount} reviews)</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded">
          <Clock className="w-4 h-4" />
          {product.preparationTime}
        </div>
        
        {!product.isAvailable && (
          <div className="flex items-center gap-1.5 text-red-600 font-bold bg-red-50 px-2 py-1 rounded">
            <AlertCircle className="w-4 h-4" />
            Currently Unavailable
          </div>
        )}
      </div>
      
      <p className="text-gray-600 leading-relaxed mb-6">
        {product.description}
      </p>
      
      {product.ingredients && product.ingredients.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Key Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ingredient, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
