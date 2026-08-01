import React from 'react';
import { Controller } from 'react-hook-form';

export default function OrderingSettingsForm({ register, errors, control }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Fulfillment Types</h2>
        
        {errors.ordering?.root?.message && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm font-medium">
            {errors.ordering.root.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
            <div className="pt-0.5">
              <input 
                type="checkbox" 
                {...register('ordering.deliveryEnabled')}
                className="w-5 h-5 accent-brand-yellow cursor-pointer"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Delivery Enabled</div>
              <div className="text-sm text-gray-500">Allow customers to order for delivery.</div>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
            <div className="pt-0.5">
              <input 
                type="checkbox" 
                {...register('ordering.takeawayEnabled')}
                className="w-5 h-5 accent-brand-yellow cursor-pointer"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Takeaway Enabled</div>
              <div className="text-sm text-gray-500">Allow customers to place pickup orders.</div>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Fees & Limits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Order Amount (₹)</label>
            <input 
              type="number" 
              {...register('ordering.minimumOrderAmount')}
              className={`w-full bg-gray-50 border ${errors.ordering?.minimumOrderAmount ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              min="0"
            />
            {errors.ordering?.minimumOrderAmount && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ordering.minimumOrderAmount.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Fee (₹)</label>
            <input 
              type="number" 
              {...register('ordering.deliveryFee')}
              className={`w-full bg-gray-50 border ${errors.ordering?.deliveryFee ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              min="0"
            />
            {errors.ordering?.deliveryFee && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ordering.deliveryFee.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Free Delivery Threshold (₹)</label>
            <input 
              type="number" 
              {...register('ordering.freeDeliveryThreshold', { valueAsNumber: true, setValueAs: v => v === "" ? null : parseFloat(v) })}
              className={`w-full bg-gray-50 border ${errors.ordering?.freeDeliveryThreshold ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              min="0"
              placeholder="Leave blank if not applicable"
            />
            {errors.ordering?.freeDeliveryThreshold && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ordering.freeDeliveryThreshold.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tax Percentage (%)</label>
            <input 
              type="number" 
              {...register('ordering.taxPercentage')}
              className={`w-full bg-gray-50 border ${errors.ordering?.taxPercentage ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              min="0"
              max="100"
              step="0.1"
            />
            {errors.ordering?.taxPercentage && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ordering.taxPercentage.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Max Quantity Per Item</label>
            <input 
              type="number" 
              {...register('ordering.maximumItemQuantity')}
              className={`w-full bg-gray-50 border ${errors.ordering?.maximumItemQuantity ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              min="1"
              max="100"
            />
            {errors.ordering?.maximumItemQuantity && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ordering.maximumItemQuantity.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Estimated Times</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Time (Minutes)</label>
            <input 
              type="number" 
              {...register('ordering.estimatedDeliveryMinutes')}
              className={`w-full bg-gray-50 border ${errors.ordering?.estimatedDeliveryMinutes ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              min="1"
            />
            {errors.ordering?.estimatedDeliveryMinutes && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ordering.estimatedDeliveryMinutes.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Takeaway Pickup Time (Minutes)</label>
            <input 
              type="number" 
              {...register('ordering.estimatedPickupMinutes')}
              className={`w-full bg-gray-50 border ${errors.ordering?.estimatedPickupMinutes ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              min="1"
            />
            {errors.ordering?.estimatedPickupMinutes && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ordering.estimatedPickupMinutes.message}</p>}
          </div>
        </div>
      </div>

    </div>
  );
}
