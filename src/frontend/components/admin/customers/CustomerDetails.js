import React from 'react';
import { Mail, Phone, Calendar, Clock, MapPin, UserCheck, Shield } from 'lucide-react';
import { formatDate } from '@/frontend/utils/dateHelpers';

export default function CustomerDetails({ user }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <UserCheck className="w-64 h-64" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-brand-yellow/10 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0">
          <span className="text-3xl font-black text-brand-yellow">
            {user.fullname.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h2 className="text-2xl font-black text-gray-900">{user.fullname}</h2>
            {user.role === 'admin' && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 bg-purple-100 text-purple-700 rounded-md">
                <Shield className="w-3 h-3" />
                Admin
              </span>
            )}
          </div>
          <p className="text-gray-500 font-medium">Customer ID: {user._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                <p className="font-bold">{user.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                <p className="font-bold">{user.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            Account Details
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Joined Date</p>
                <p className="font-bold">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Last Login</p>
                <p className="font-bold">{user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never logged in'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Saved Addresses */}
      {user.addresses && user.addresses.length > 0 && (
        <div className="mt-8 relative z-10">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Saved Addresses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map((address, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{address.label || 'Address'}</span>
                    {address.isDefault && (
                      <span className="text-[10px] font-bold uppercase bg-brand-yellow/20 text-brand-charcoal px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {address.addressLine}
                    {address.landmark && `, near ${address.landmark}`}
                    <br />
                    {address.city}, {address.state} {address.pincode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
