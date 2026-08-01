"use client";

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function AdminError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Admin Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-full min-h-[50vh]">
      <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-2">Something went wrong!</h2>
        <p className="text-gray-500 mb-8 text-sm">
          {error.message || "An unexpected error occurred in the admin portal."}
        </p>
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
