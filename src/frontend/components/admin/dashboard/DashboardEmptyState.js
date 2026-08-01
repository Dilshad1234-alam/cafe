import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardEmptyState() {
  return (
    <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center flex flex-col items-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <LayoutDashboard className="w-10 h-10 text-gray-300" />
      </div>
      <h2 className="font-serif text-2xl font-black text-brand-charcoal mb-2">
        Welcome to the Admin Portal!
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Your dashboard is looking a little empty. Once you add products, categories, and start receiving orders, your statistics will appear here.
      </p>
    </div>
  );
}
