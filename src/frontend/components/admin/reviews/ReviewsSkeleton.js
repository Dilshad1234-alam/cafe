import React from 'react';

export default function ReviewsSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      {/* Desktop View */}
      <div className="hidden lg:block">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              {[...Array(7)].map((_, i) => (
                <th key={i} className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="p-4 pl-6">
                  <div className="h-5 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-32"></div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="p-4 w-1/3">
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </td>
                <td className="p-4">
                  <div className="h-6 bg-gray-200 rounded-md w-20"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-8 w-20 bg-gray-200 rounded-xl"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden p-4 space-y-4 bg-gray-50/50">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded-md w-16"></div>
            </div>
            <div className="h-10 bg-gray-50 rounded-xl border border-gray-100"></div>
            <div className="h-12 bg-gray-100 rounded mt-1"></div>
            <div className="flex gap-2 mt-2">
              <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
