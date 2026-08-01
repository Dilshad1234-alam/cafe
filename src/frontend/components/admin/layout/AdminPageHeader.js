import React from 'react';

export default function AdminPageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-black text-brand-charcoal mb-1 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-medium text-gray-500">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0 self-start sm:self-auto">
          {action}
        </div>
      )}
    </div>
  );
}
