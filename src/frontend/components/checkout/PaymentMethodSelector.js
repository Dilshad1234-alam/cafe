"use client";

import { Banknote, CreditCard, ShieldCheck } from "lucide-react";

export default function PaymentMethodSelector({ orderType, paymentMethod, setValue }) {
  const isDelivery = orderType === "delivery";
  
  // Handlers for selection
  const handleSelectCash = () => {
    setValue("paymentMethod", isDelivery ? "cash_on_delivery" : "pay_at_pickup", { shouldValidate: true });
  };
  
  const handleSelectOnline = () => {
    setValue("paymentMethod", "razorpay", { shouldValidate: true });
  };

  const isCashSelected = paymentMethod === "cash_on_delivery" || paymentMethod === "pay_at_pickup";
  const isOnlineSelected = paymentMethod === "razorpay";

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
      <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-6 border-b border-gray-100 pb-4">
        {isDelivery ? "4. Payment Method" : "3. Payment Method"}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Offline Option (COD or Pickup) */}
        <button
          type="button"
          onClick={handleSelectCash}
          className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
            isCashSelected 
              ? "border-brand-yellow bg-brand-yellow/5" 
              : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isCashSelected ? "bg-brand-yellow text-brand-charcoal" : "bg-gray-100 text-gray-500"
          }`}>
            {isDelivery ? <Banknote className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-1 ${isCashSelected ? "text-brand-charcoal" : "text-gray-700"}`}>
              {isDelivery ? "Cash on Delivery" : "Pay at Pickup"}
            </h3>
            <p className="text-sm text-gray-600">
              {isDelivery ? "Pay when your order is delivered." : "Pay when you collect your order."}
            </p>
          </div>
          <div className={`absolute top-5 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isCashSelected ? "border-brand-yellow" : "border-gray-300"
          }`}>
            {isCashSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></div>}
          </div>
        </button>

        {/* Online Option (Razorpay) */}
        <button
          type="button"
          onClick={handleSelectOnline}
          className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
            isOnlineSelected 
              ? "border-brand-yellow bg-brand-yellow/5" 
              : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isOnlineSelected ? "bg-brand-yellow text-brand-charcoal" : "bg-gray-100 text-gray-500"
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-1 ${isOnlineSelected ? "text-brand-charcoal" : "text-gray-700"}`}>
              Pay Online
            </h3>
            <p className="text-sm text-gray-600">
              Pay securely using UPI, cards, net banking or supported payment methods.
            </p>
          </div>
          <div className={`absolute top-5 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isOnlineSelected ? "border-brand-yellow" : "border-gray-300"
          }`}>
            {isOnlineSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></div>}
          </div>
        </button>

      </div>
      
      {isOnlineSelected && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-charcoal" />
          <span>Online payments are processed securely through Razorpay.</span>
        </div>
      )}
      
    </div>
  );
}
