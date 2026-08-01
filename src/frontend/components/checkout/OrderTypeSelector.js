"use client";

import { Bike, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";
import { useSettingsStore } from "@/frontend/store/settingsStore";

export default function OrderTypeSelector({ orderType, setValue }) {
  const { settings } = useSettingsStore();
  const address = settings?.business?.addressLine || siteConfig.address;
  
  const isDeliveryEnabled = settings ? settings.ordering?.deliveryEnabled : true;
  const isTakeawayEnabled = settings ? settings.ordering?.takeawayEnabled : true;
  
  // If no delivery/takeaway enabled (shouldn't happen but just in case)
  if (!isDeliveryEnabled && !isTakeawayEnabled) return null;
  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
      <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-6 border-b border-gray-100 pb-4">
        2. Order Type
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Delivery Option */}
        {isDeliveryEnabled && (
        <button
          type="button"
          onClick={() => setValue("orderType", "delivery")}
          className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
            orderType === "delivery" 
              ? "border-brand-yellow bg-brand-yellow/5" 
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            orderType === "delivery" ? "bg-brand-yellow text-brand-charcoal" : "bg-gray-50 text-gray-400"
          }`}>
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-1 ${orderType === "delivery" ? "text-brand-charcoal" : "text-gray-700"}`}>
              Delivery
            </h3>
            <p className="text-sm text-gray-500">Delivered directly to your door.</p>
          </div>
          
          {/* Radio Indicator */}
          <div className="absolute top-5 right-5 w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center">
            {orderType === "delivery" && <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></div>}
          </div>
        </button>
        )}

        {/* Takeaway Option */}
        {isTakeawayEnabled && (
        <button
          type="button"
          onClick={() => setValue("orderType", "takeaway")}
          className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
            orderType === "takeaway" 
              ? "border-brand-yellow bg-brand-yellow/5" 
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            orderType === "takeaway" ? "bg-brand-yellow text-brand-charcoal" : "bg-gray-50 text-gray-400"
          }`}>
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-1 ${orderType === "takeaway" ? "text-brand-charcoal" : "text-gray-700"}`}>
              Takeaway
            </h3>
            <p className="text-sm text-gray-500">Pick up from the cafe yourself.</p>
          </div>
          
          {/* Radio Indicator */}
          <div className="absolute top-5 right-5 w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center">
            {orderType === "takeaway" && <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></div>}
          </div>
        </button>
        )}
        
      </div>

      {orderType === "takeaway" && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
          <div className="w-6 h-6 shrink-0 text-gray-400 mt-0.5">📍</div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Pickup Location</h4>
            <p className="text-sm text-gray-600 mt-1">{address}</p>
          </div>
        </div>
      )}
      
    </div>
  );
}
