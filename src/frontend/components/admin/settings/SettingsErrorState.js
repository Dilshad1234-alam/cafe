import React from 'react';
import { AlertOctagon } from 'lucide-react';

export default function SettingsErrorState({ error, onRetry }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center shadow-sm">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertOctagon className="w-8 h-8 text-brand-red" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load settings</h3>
      <p className="text-gray-500 max-w-sm mb-6">
        {error?.message || "There was an error communicating with the server. Please try again."}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
