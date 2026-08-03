"use client";

import SafeImage from "@/frontend/components/ui/SafeImage";
import Link from "next/link";
import { Edit2, Loader2 } from "lucide-react";
import { useSettingsStore } from "@/frontend/store/settingsStore";

export default function CheckoutOrderSummary({ items, subtotal, isSubmitting, orderType }) {
  const { settings } = useSettingsStore();
  
  // Frontend calculated total
  const deliveryFee = settings?.ordering?.deliveryFee || 0;
  const freeDeliveryThreshold = settings?.ordering?.freeDeliveryThreshold;
  
  let actualDeliveryFee = 0;
  if (orderType === "delivery") {
    actualDeliveryFee = (freeDeliveryThreshold && subtotal >= freeDeliveryThreshold) ? 0 : deliveryFee;
  }
  
  const taxPercentage = settings?.ordering?.taxPercentage || 0;
  const taxAmount = (subtotal * taxPercentage) / 100;
  
  const grandTotal = subtotal + actualDeliveryFee + taxAmount;

  return (
    <div className="bg-brand-charcoal text-white rounded-[2rem] p-6 sm:p-8 shadow-xl sticky top-24">
      
      <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-6">
        <h2 className="font-serif text-2xl font-bold">Order Summary</h2>
        <Link 
          href="/cart" 
          className="text-sm font-bold text-brand-yellow hover:text-white transition-colors flex items-center gap-1"
        >
          <Edit2 className="w-3.5 h-3.5" /> Edit
        </Link>
      </div>
      
      {/* Items List */}
      <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => {
          const price = item.unitPrice || item.salePrice || item.originalPrice;
          const itemTotal = price * item.quantity;
          const sizeText = item.selectedSize ? item.selectedSize.name : null;
          
          return (
            <div key={item.itemKey} className="flex gap-4 items-start">
              <div className="relative w-16 h-16 shrink-0 bg-white/5 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                <SafeImage 
                  src={item.image || "/window.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-yellow text-brand-charcoal rounded-full flex items-center justify-center text-xs font-bold border-2 border-brand-charcoal">
                  {item.quantity}
                </div>
              </div>
              
              <div className="flex-grow">
                <h4 className="font-bold text-sm leading-tight text-white mb-1">{item.name}</h4>
                {sizeText && (
                  <p className="text-xs text-gray-400">Size: {sizeText}</p>
                )}
              </div>
              
              <div className="font-bold text-sm">
                ₹{itemTotal}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Summary */}
      <div className="space-y-3 mb-6 border-t border-white/10 pt-6">
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Subtotal</span>
          <span className="font-bold text-white">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Delivery</span>
          {orderType === "takeaway" ? (
            <span className="text-white font-bold">₹0</span>
          ) : (
            <span className="font-bold text-white">
              {actualDeliveryFee === 0 ? "Free" : `₹${actualDeliveryFee}`}
            </span>
          )}
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Taxes ({taxPercentage}%)</span>
          <span className="font-bold text-white">₹{taxAmount.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Total */}
      <div className="border-t border-white/10 pt-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total</span>
          <span className="font-black text-3xl text-brand-yellow">₹{grandTotal}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Final price will be verified before order confirmation.
        </p>
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        form="checkout-form"
        disabled={isSubmitting}
        className="w-full py-4 bg-brand-yellow text-brand-charcoal rounded-xl font-bold text-lg hover:bg-[#E5A800] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-brand-yellow/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          orderType === "delivery" ? "Continue with Cash on Delivery" : "Confirm Pickup Details"
        )}
      </button>

    </div>
  );
}
