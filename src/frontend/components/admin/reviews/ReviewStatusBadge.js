import React from 'react';

export default function ReviewStatusBadge({ status }) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700 border border-green-200">
        Approved
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700 border border-red-200">
        Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-brand-yellow/20 text-brand-charcoal border border-brand-yellow/30">
      Pending
    </span>
  );
}
