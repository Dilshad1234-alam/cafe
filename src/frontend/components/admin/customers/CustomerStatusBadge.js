import React from 'react';

export default function CustomerStatusBadge({ isActive }) {
  if (isActive) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
      Inactive
    </span>
  );
}
