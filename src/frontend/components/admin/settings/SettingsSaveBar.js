import React from 'react';
import { Save, AlertCircle } from 'lucide-react';

export default function SettingsSaveBar({ isDirty, isSaving, onSave }) {
  if (!isDirty && !isSaving) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-40 p-4 animate-in slide-in-from-bottom-10 duration-300">
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-800">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-brand-yellow" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Unsaved Changes</h4>
            <p className="text-xs text-gray-400">You have modified settings that need to be saved.</p>
          </div>
        </div>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="w-full sm:w-auto px-6 py-2.5 bg-brand-yellow hover:bg-yellow-500 text-brand-charcoal font-black rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-brand-charcoal/30 border-t-brand-charcoal rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>

      </div>
    </div>
  );
}
