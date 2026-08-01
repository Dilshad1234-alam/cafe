import React from 'react';

export default function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex gap-2 border-b border-gray-200 pb-1 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-32 bg-gray-200 rounded-t-xl"></div>
        ))}
      </div>
      
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
            </div>
          ))}
          <div className="md:col-span-2">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
