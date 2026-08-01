import React from 'react';

export default function SocialSettingsForm({ register, errors }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Social Links & Contact</h2>
        
        <div className="grid grid-cols-1 gap-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label>
            <input 
              type="text" 
              {...register('social.whatsappNumber')}
              className={`w-full bg-gray-50 border ${errors.social?.whatsappNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. 918208735776"
            />
            {errors.social?.whatsappNumber && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.social.whatsappNumber.message}</p>}
            <p className="text-xs text-gray-400 mt-1.5">Include country code without '+' for direct wa.me linking.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Instagram URL</label>
            <input 
              type="url" 
              {...register('social.instagramUrl')}
              className={`w-full bg-gray-50 border ${errors.social?.instagramUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="https://instagram.com/..."
            />
            {errors.social?.instagramUrl && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.social.instagramUrl.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
            <input 
              type="url" 
              {...register('social.facebookUrl')}
              className={`w-full bg-gray-50 border ${errors.social?.facebookUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="https://facebook.com/..."
            />
            {errors.social?.facebookUrl && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.social.facebookUrl.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Google Maps Profile URL</label>
            <input 
              type="url" 
              {...register('social.googleMapsUrl')}
              className={`w-full bg-gray-50 border ${errors.social?.googleMapsUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="https://maps.google.com/..."
            />
            {errors.social?.googleMapsUrl && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.social.googleMapsUrl.message}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}
