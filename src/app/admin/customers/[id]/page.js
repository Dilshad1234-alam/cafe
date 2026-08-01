"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAdminCustomerDetails } from '@/frontend/services/admin/customerService';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import CustomerDetails from '@/frontend/components/admin/customers/CustomerDetails';
import CustomerStats from '@/frontend/components/admin/customers/CustomerStats';
import CustomerRecentOrders from '@/frontend/components/admin/customers/CustomerRecentOrders';
import CustomerStatusDialog from '@/frontend/components/admin/customers/CustomerStatusDialog';
import CustomerStatusBadge from '@/frontend/components/admin/customers/CustomerStatusBadge';
import { toast } from 'sonner';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AdminCustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id;
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  const loadCustomerData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAdminCustomerDetails(customerId);
      setData(result);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load customer details");
      router.push('/admin/customers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) {
      loadCustomerData();
    }
  }, [customerId]);

  const handleUpdateStatus = (updatedCustomer) => {
    setData((prev) => ({
      ...prev,
      user: { ...prev.user, isActive: updatedCustomer.isActive }
    }));
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50/50 pb-20">
        <AdminPageHeader title="Customer Details" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[400px]">
          <div className="text-gray-400 font-bold flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-charcoal rounded-full animate-spin"></div>
            Loading...
          </div>
        </div>
      </main>
    );
  }

  if (!data) return null;

  const { user, stats, recentOrders } = data;

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <AdminPageHeader 
        title="Customer Profile" 
        subtitle="Manage customer account, view stats, and order history"
        backLink="/admin/customers"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Actions & Badges */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <CustomerStatusBadge isActive={user.isActive} />
            {user.role === 'admin' && (
              <span className="text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                Administrator Account
              </span>
            )}
          </div>
          
          <div className="w-full sm:w-auto">
            <button 
              onClick={() => setShowStatusDialog(true)}
              className={`w-full sm:w-auto px-4 py-2 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm border ${
                user.isActive 
                  ? 'border-brand-red text-brand-red bg-white hover:bg-red-50' 
                  : 'bg-green-600 text-white border-green-600 hover:bg-green-700'
              }`}
            >
              {user.isActive ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Deactivate Account
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Activate Account
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <CustomerStats stats={stats} />

        {/* Two Column Layout for Details and Orders */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <CustomerDetails user={user} />
          </div>
          <div className="xl:col-span-2">
            <CustomerRecentOrders orders={recentOrders} />
          </div>
        </div>
      </div>

      {showStatusDialog && (
        <CustomerStatusDialog 
          customer={user} 
          onClose={() => setShowStatusDialog(false)} 
          onUpdate={handleUpdateStatus}
        />
      )}
    </main>
  );
}
