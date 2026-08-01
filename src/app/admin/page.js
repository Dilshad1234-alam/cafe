"use client";

import React, { useEffect, useState } from 'react';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import DashboardStatCard from '@/frontend/components/admin/dashboard/DashboardStatCard';
import RecentOrders from '@/frontend/components/admin/dashboard/RecentOrders';
import OrderStatusSummary from '@/frontend/components/admin/dashboard/OrderStatusSummary';
import PopularProducts from '@/frontend/components/admin/dashboard/PopularProducts';
import DashboardEmptyState from '@/frontend/components/admin/dashboard/DashboardEmptyState';
import { fetchDashboardMetrics } from '@/frontend/services/admin/dashboardService';
import { ShoppingBag, DollarSign, Pizza, Users, AlertTriangle, RefreshCcw } from 'lucide-react';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-yellow rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Loading Dashboard</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Error loading dashboard</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button 
          onClick={loadDashboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-bold"
        >
          <RefreshCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  if (!metrics || metrics.totalOrders === 0 && metrics.totalProducts === 0) {
    return (
      <>
        <AdminPageHeader 
          title="Dashboard" 
          description="Overview of your business performance"
        />
        <DashboardEmptyState />
      </>
    );
  }

  return (
    <div className="pb-10">
      <AdminPageHeader 
        title="Dashboard" 
        description={`Here's what's happening today, ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
      />

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStatCard 
          title="Today's Revenue"
          value={`₹${metrics.todayRevenue?.toFixed(2) || '0.00'}`}
          subtitle={`Total: ₹${metrics.totalRevenue?.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="green"
        />
        <DashboardStatCard 
          title="Today's Orders"
          value={metrics.todayOrders}
          subtitle={`${metrics.pendingOrders} pending currently`}
          icon={ShoppingBag}
          color="blue"
        />
        <DashboardStatCard 
          title="Total Products"
          value={metrics.totalProducts}
          subtitle={`${metrics.availableProducts} available`}
          icon={Pizza}
          color="orange"
        />
        <DashboardStatCard 
          title="Total Customers"
          value={metrics.totalCustomers}
          icon={Users}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-2">
          <RecentOrders orders={metrics.recentOrders} />
        </div>

        {/* Right Column: Summaries */}
        <div className="space-y-8">
          <OrderStatusSummary 
            pending={metrics.pendingOrders}
            completed={metrics.completedOrders}
            cancelled={metrics.cancelledOrders}
            total={metrics.totalOrders}
          />
          <PopularProducts products={metrics.popularProducts} />
        </div>
      </div>
    </div>
  );
}
