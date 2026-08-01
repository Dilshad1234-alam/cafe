import React from 'react';
import Link from 'next/link';
import { Eye, MapPin } from 'lucide-react';
import CustomerStatusBadge from './CustomerStatusBadge';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function CustomerTable({ customers }) {
  return (
    <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <th className="p-4 pl-6">Customer</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Role</th>
            <th className="p-4">Orders</th>
            <th className="p-4">Total Spending</th>
            <th className="p-4">Joined Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-gray-50/50 transition-colors">
              
              <td className="p-4 pl-6 align-middle">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 truncate max-w-[180px]" title={customer.fullname}>
                    {customer.fullname}
                  </span>
                  {customer.addresses?.length > 0 && (
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {customer.addresses.length} Saved Address{customer.addresses.length !== 1 ? 'es' : ''}
                    </span>
                  )}
                </div>
              </td>

              <td className="p-4 align-middle">
                <div className="flex flex-col max-w-[200px]">
                  <span className="font-medium text-gray-900 truncate text-sm" title={customer.email}>
                    {customer.email}
                  </span>
                  <span className="text-xs text-gray-500 font-medium truncate mt-0.5">
                    {customer.phone || 'No phone'}
                  </span>
                </div>
              </td>

              <td className="p-4 align-middle">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                  customer.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {customer.role}
                </span>
              </td>

              <td className="p-4 align-middle">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">{customer.totalOrders || 0}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
                    {customer.deliveredOrdersCount || 0} Delivered
                  </span>
                </div>
              </td>

              <td className="p-4 align-middle">
                <span className="font-black text-gray-900">
                  ₹{(customer.totalSpending || 0).toFixed(2)}
                </span>
              </td>

              <td className="p-4 align-middle">
                <span className="text-sm font-medium text-gray-700">
                  {formatDate(customer.createdAt)}
                </span>
              </td>

              <td className="p-4 align-middle">
                <CustomerStatusBadge isActive={customer.isActive} />
              </td>

              <td className="p-4 align-middle text-center">
                <Link 
                  href={`/admin/customers/${customer._id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-brand-charcoal text-xs font-bold rounded-lg hover:border-brand-yellow hover:text-brand-yellow transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
