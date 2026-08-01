import React from 'react';
import { Controller } from 'react-hook-form';

export default function BusinessSettingsForm({ register, errors, control }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">General Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Business Name *</label>
            <input 
              type="text" 
              {...register('business.name')}
              className={`w-full bg-gray-50 border ${errors.business?.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. The Tasty Zone"
            />
            {errors.business?.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Short Name</label>
            <input 
              type="text" 
              {...register('business.shortName')}
              className="w-full bg-gray-50 border border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none"
              placeholder="e.g. Tasty Zone"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Business Description</label>
            <textarea 
              rows="3"
              {...register('business.description')}
              className={`w-full bg-gray-50 border ${errors.business?.description ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none resize-none`}
              placeholder="Brief description of your business..."
            />
            {errors.business?.description && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.description.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Contact & Location</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Primary Phone *</label>
            <input 
              type="text" 
              {...register('business.phone')}
              className={`w-full bg-gray-50 border ${errors.business?.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. +91 8208735776"
            />
            {errors.business?.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              {...register('business.email')}
              className={`w-full bg-gray-50 border ${errors.business?.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. info@thetastyzone.com"
            />
            {errors.business?.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.email.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Address Line *</label>
            <input 
              type="text" 
              {...register('business.addressLine')}
              className={`w-full bg-gray-50 border ${errors.business?.addressLine ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. Shankar Chowk, Sindhi Colony"
            />
            {errors.business?.addressLine && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.addressLine.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
            <input 
              type="text" 
              {...register('business.city')}
              className={`w-full bg-gray-50 border ${errors.business?.city ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. Gondia"
            />
            {errors.business?.city && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.city.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Pincode *</label>
            <input 
              type="text" 
              {...register('business.pincode')}
              className={`w-full bg-gray-50 border ${errors.business?.pincode ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. 441614"
            />
            {errors.business?.pincode && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.pincode.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Operating Hours</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Opening Time *</label>
            <input 
              type="time" 
              {...register('business.openingHours')}
              className={`w-full bg-gray-50 border ${errors.business?.openingHours ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
            />
            {errors.business?.openingHours && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.openingHours.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Closing Time *</label>
            <input 
              type="time" 
              {...register('business.closingHours')}
              className={`w-full bg-gray-50 border ${errors.business?.closingHours ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
            />
            {errors.business?.closingHours && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business.closingHours.message}</p>}
          </div>
        </div>
      </div>

    </div>
  );
}
