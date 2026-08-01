import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function OrderItemsList({ order }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
      <h2 className="text-lg font-black text-brand-charcoal mb-4">Order Items</h2>
      
      <div className="space-y-4 mb-6">
        {order.items.map((item, index) => (
          <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0 bg-white border border-gray-200" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-gray-900 leading-tight">
                  {item.name} <span className="text-gray-500 font-medium">x{item.quantity}</span>
                </h4>
                <span className="font-black text-brand-charcoal shrink-0">
                  ₹{item.itemTotal.toFixed(2)}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 font-medium mt-1 space-y-0.5">
                {item.selectedSize && (
                  <p><span className="font-bold text-gray-700">Size:</span> {item.selectedSize.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p><span className="font-bold text-gray-700">Add-ons:</span> {item.selectedAddOns.map(a => a.name).join(", ")}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Subtotal</span>
          <span className="font-bold text-gray-900">₹{(order.pricing?.subtotal || 0).toFixed(2)}</span>
        </div>
        
        {(order.pricing?.deliveryFee || 0) > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Delivery Fee</span>
            <span className="font-bold text-gray-900">₹{(order.pricing?.deliveryFee || 0).toFixed(2)}</span>
          </div>
        )}
        
        {(order.pricing?.tax || 0) > 0 && (
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>Taxes</span>
            <span className="font-bold text-gray-900">₹{(order.pricing?.tax || 0).toFixed(2)}</span>
          </div>
        )}
        
        {(order.pricing?.discount || 0) > 0 && (
          <div className="flex justify-between items-center text-sm text-brand-red">
            <span className="font-bold">Discount</span>
            <span>-₹{(order.pricing?.discount || 0).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-2xl font-black text-brand-charcoal">₹{(order.pricing?.total || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
