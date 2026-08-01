import React from 'react';
import { Store, ShoppingBag, Share2, LayoutTemplate } from 'lucide-react';

const tabs = [
  { id: 'business', label: 'Business Profile', icon: Store },
  { id: 'ordering', label: 'Ordering & Fees', icon: ShoppingBag },
  { id: 'social', label: 'Social & Links', icon: Share2 },
  { id: 'appearance', label: 'Appearance', icon: LayoutTemplate },
];

export default function SettingsTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 border-b border-gray-200 pb-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-colors whitespace-nowrap ${
              isActive
                ? 'bg-brand-charcoal text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-brand-yellow' : 'text-gray-400'}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
