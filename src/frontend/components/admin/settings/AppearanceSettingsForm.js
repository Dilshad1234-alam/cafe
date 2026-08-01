import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function AppearanceSettingsForm({ register, errors, watch }) {
  const logoUrl = watch('appearance.logoUrl');
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Brand Assets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Logo URL</label>
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <input 
                  type="url" 
                  {...register('appearance.logoUrl')}
                  className={`w-full bg-gray-50 border ${errors.appearance?.logoUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
                  placeholder="https://example.com/logo.png"
                />
                {errors.appearance?.logoUrl && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.appearance.logoUrl.message}</p>}
                <p className="text-xs text-gray-400 mt-2">Enter a direct URL to your logo image. Leave blank for default typography.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Favicon URL</label>
            <input 
              type="url" 
              {...register('appearance.faviconUrl')}
              className={`w-full bg-gray-50 border ${errors.appearance?.faviconUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="https://example.com/favicon.ico"
            />
            {errors.appearance?.faviconUrl && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.appearance.faviconUrl.message}</p>}
          </div>

        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6">Public Announcements</h2>
        
        <div className="grid grid-cols-1 gap-6">
          <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
            <div className="pt-0.5">
              <input 
                type="checkbox" 
                {...register('appearance.announcementEnabled')}
                className="w-5 h-5 accent-brand-yellow cursor-pointer"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Enable Site Announcement</div>
              <div className="text-sm text-gray-500">Display a banner at the top of the website.</div>
            </div>
          </label>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Announcement Text</label>
            <input 
              type="text" 
              {...register('appearance.announcementText')}
              className={`w-full bg-gray-50 border ${errors.appearance?.announcementText ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none`}
              placeholder="e.g. Free delivery on all orders this weekend!"
              maxLength={200}
            />
            {errors.appearance?.announcementText && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.appearance.announcementText.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Footer Text</label>
            <textarea 
              rows="2"
              {...register('appearance.footerText')}
              className={`w-full bg-gray-50 border ${errors.appearance?.footerText ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow'} text-gray-900 rounded-xl px-4 py-3 text-sm transition-colors outline-none resize-none`}
              placeholder="A brief tagline for the footer..."
              maxLength={300}
            />
            {errors.appearance?.footerText && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.appearance.footerText.message}</p>}
          </div>
        </div>
      </div>

    </div>
  );
}
