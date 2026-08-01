"use client";

import { Home, Briefcase, MapPin } from "lucide-react";

export default function DeliveryAddressForm({ register, errors, watch, setValue }) {
  const currentLabel = watch("deliveryAddress.label");

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
      <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-6 border-b border-gray-100 pb-4">
        3. Delivery Address
      </h2>
      
      <div className="space-y-6">
        
        {/* House and Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="deliveryAddress.house" className="block text-sm font-bold text-gray-700 mb-2">
              House / Flat / Shop No. <span className="text-brand-red">*</span>
            </label>
            <input
              id="deliveryAddress.house"
              type="text"
              {...register("deliveryAddress.house")}
              className={`w-full px-4 py-3 rounded-xl border ${errors?.deliveryAddress?.house ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
              placeholder="e.g., Flat 204"
            />
            {errors?.deliveryAddress?.house && (
              <p className="mt-1 text-sm text-brand-red font-medium">{errors.deliveryAddress.house.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="deliveryAddress.area" className="block text-sm font-bold text-gray-700 mb-2">
              Area / Locality <span className="text-brand-red">*</span>
            </label>
            <input
              id="deliveryAddress.area"
              type="text"
              {...register("deliveryAddress.area")}
              className={`w-full px-4 py-3 rounded-xl border ${errors?.deliveryAddress?.area ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
              placeholder="e.g., Sindhi Colony"
            />
            {errors?.deliveryAddress?.area && (
              <p className="mt-1 text-sm text-brand-red font-medium">{errors.deliveryAddress.area.message}</p>
            )}
          </div>
        </div>

        {/* Landmark */}
        <div>
          <label htmlFor="deliveryAddress.landmark" className="block text-sm font-bold text-gray-700 mb-2">
            Landmark <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            id="deliveryAddress.landmark"
            type="text"
            {...register("deliveryAddress.landmark")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            placeholder="e.g., Near Main Market"
          />
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="deliveryAddress.city" className="block text-sm font-bold text-gray-700 mb-2">
              City <span className="text-brand-red">*</span>
            </label>
            <input
              id="deliveryAddress.city"
              type="text"
              {...register("deliveryAddress.city")}
              className={`w-full px-4 py-3 rounded-xl border ${errors?.deliveryAddress?.city ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
              placeholder="e.g., Gondia"
            />
            {errors?.deliveryAddress?.city && (
              <p className="mt-1 text-sm text-brand-red font-medium">{errors.deliveryAddress.city.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="deliveryAddress.state" className="block text-sm font-bold text-gray-700 mb-2">
              State <span className="text-brand-red">*</span>
            </label>
            <input
              id="deliveryAddress.state"
              type="text"
              {...register("deliveryAddress.state")}
              className={`w-full px-4 py-3 rounded-xl border ${errors?.deliveryAddress?.state ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
              placeholder="e.g., Maharashtra"
            />
            {errors?.deliveryAddress?.state && (
              <p className="mt-1 text-sm text-brand-red font-medium">{errors.deliveryAddress.state.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="deliveryAddress.pincode" className="block text-sm font-bold text-gray-700 mb-2">
              Pincode <span className="text-brand-red">*</span>
            </label>
            <input
              id="deliveryAddress.pincode"
              type="text"
              maxLength={6}
              {...register("deliveryAddress.pincode")}
              className={`w-full px-4 py-3 rounded-xl border ${errors?.deliveryAddress?.pincode ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
              placeholder="441601"
            />
            {errors?.deliveryAddress?.pincode && (
              <p className="mt-1 text-sm text-brand-red font-medium">{errors.deliveryAddress.pincode.message}</p>
            )}
          </div>
        </div>

        {/* Save Address As Label */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Save Address As
          </label>
          <div className="flex flex-wrap gap-3">
            
            <button
              type="button"
              onClick={() => setValue("deliveryAddress.label", "Home")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-colors ${
                currentLabel === "Home" 
                  ? "border-brand-yellow bg-brand-yellow/10 text-brand-charcoal font-bold" 
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </button>
            
            <button
              type="button"
              onClick={() => setValue("deliveryAddress.label", "Work")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-colors ${
                currentLabel === "Work" 
                  ? "border-brand-yellow bg-brand-yellow/10 text-brand-charcoal font-bold" 
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Briefcase className="w-4 h-4" /> Work
            </button>
            
            <button
              type="button"
              onClick={() => setValue("deliveryAddress.label", "Other")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-colors ${
                currentLabel === "Other" 
                  ? "border-brand-yellow bg-brand-yellow/10 text-brand-charcoal font-bold" 
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <MapPin className="w-4 h-4" /> Other
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
}
