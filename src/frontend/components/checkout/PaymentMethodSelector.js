"use client";

import { Banknote, CreditCard } from "lucide-react";

export default function PaymentMethodSelector({ orderType, paymentMethod, setValue }) {
  // If delivery, lock to cash_on_delivery. If takeaway, lock to pay_at_pickup.
  // In a real app with Razorpay, this would allow user selection.
  
  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
      <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-6 border-b border-gray-100 pb-4">
        {orderType === "delivery" ? "4. Payment Method" : "3. Payment Method"}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {orderType === "delivery" && (
          <div className="relative flex items-center gap-4 p-5 rounded-2xl border-2 border-brand-yellow bg-brand-yellow/5 text-left">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-brand-yellow text-brand-charcoal">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-brand-charcoal mb-1">
                Cash on Delivery
              </h3>
              <p className="text-sm text-gray-600">Pay directly to our delivery partner.</p>
            </div>
            <div className="absolute top-5 right-5 w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></div>
            </div>
          </div>
        )}

        {orderType === "takeaway" && (
          <div className="relative flex items-center gap-4 p-5 rounded-2xl border-2 border-brand-yellow bg-brand-yellow/5 text-left">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-brand-yellow text-brand-charcoal">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-brand-charcoal mb-1">
                Pay at Pickup
              </h3>
              <p className="text-sm text-gray-600">Pay at the counter when you pick up.</p>
            </div>
            <div className="absolute top-5 right-5 w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></div>
            </div>
          </div>
        )}

      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500">
        Note: Online payments are currently disabled. Please prepare cash or use UPI at the time of {orderType === "delivery" ? "delivery" : "pickup"}.
      </div>
      
    </div>
  );
}
