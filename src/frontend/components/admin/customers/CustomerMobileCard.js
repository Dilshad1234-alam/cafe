import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Calendar, ShoppingBag } from 'lucide-react';
import CustomerStatusBadge from './CustomerStatusBadge';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function CustomerMobileCard({ customer }) {
  return (
    <div className="lg:hidden bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative flex flex-col gap-3">
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900 leading-tight mb-1 truncate max-w-[200px]">
            {customer.fullname}
          </h3>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
            customer.role === 'admin' 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {customer.role}
          </span>
        </div>
        <div className="text-right">
          <span className="block font-black text-brand-charcoal text-base">
            ₹{(customer.totalSpending || 0).toFixed(2)}
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            Total Spent
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 rounded-xl p-3 border border-gray-100">
        <div className="col-span-2 flex items-center gap-2 text-gray-700">
          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium truncate">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium truncate">{customer.phone || 'No phone'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <ShoppingBag className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium">{customer.totalOrders || 0} Orders</span>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-gray-700 pt-1">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-xs font-medium text-gray-500">Joined {formatDate(customer.createdAt)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100 items-center justify-between">
        <CustomerStatusBadge isActive={customer.isActive} />
        
        <Link 
          href={`/admin/customers/${customer._id}`}
          className="px-4 py-2 bg-gray-900 text-white font-bold rounded-xl text-sm transition-colors hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
      
    </div>
  );
}
