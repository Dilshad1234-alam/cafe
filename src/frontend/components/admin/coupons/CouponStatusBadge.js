import React from 'react';

export default function CouponStatusBadge({ isActive, validFrom, expiresAt }) {
  const now = new Date();
  const validFromDate = new Date(validFrom);
  const expiresAtDate = new Date(expiresAt);

  // Status priority: Inactive -> Expired -> Scheduled -> Active
  if (!isActive) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700">
        Inactive
      </span>
    );
  }

  if (now > expiresAtDate) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
        Expired
      </span>
    );
  }

  if (now < validFromDate) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700">
        Scheduled
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
      Active
    </span>
  );
}
