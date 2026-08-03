import React from 'react';
import SafeImage from '@/frontend/components/ui/SafeImage';

export default function OrderDetailsSummary({ order }) {
  const { items, pricing, notes } = order;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8">
      <h3 className="font-serif text-xl font-black text-brand-charcoal mb-6">Order Items</h3>
      
      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
            {/* Image Placeholder or Actual Image */}
            <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shrink-0 relative flex items-center justify-center">
              {item.image ? (
                <SafeImage 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs text-center p-2">
                  No Image
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="min-w-0">
                <p className="font-bold text-brand-charcoal truncate">{item.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  ₹{item.unitPrice.toFixed(2)} x {item.quantity}
                </p>
                
                {/* Size and Addons */}
                {(item.selectedSize || (item.selectedAddOns && item.selectedAddOns.length > 0)) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.selectedSize && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                        Size: {item.selectedSize.name}
                      </span>
                    )}
                    {item.selectedAddOns?.map((addon, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                        + {addon.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-left sm:text-right mt-2 sm:mt-0">
                <p className="font-bold text-brand-charcoal">₹{item.itemTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="font-medium text-brand-charcoal">₹{pricing.subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p className="font-medium text-brand-charcoal">₹{pricing.deliveryFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p className="font-medium text-brand-charcoal">₹{pricing.tax.toFixed(2)}</p>
        </div>
        {pricing.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <p>Discount</p>
            <p className="font-medium">-₹{pricing.discount.toFixed(2)}</p>
          </div>
        )}
        <div className="flex justify-between pt-4 border-t border-gray-100 text-lg font-black text-brand-charcoal">
          <p>Total</p>
          <p>₹{pricing.total.toFixed(2)}</p>
        </div>
      </div>

      {notes && (
        <div className="mt-8 bg-brand-yellow/10 p-4 rounded-xl border border-brand-yellow/20">
          <p className="text-sm font-bold text-brand-charcoal mb-1">Order Notes:</p>
          <p className="text-sm text-gray-700 italic">"{notes}"</p>
        </div>
      )}
    </div>
  );
}
