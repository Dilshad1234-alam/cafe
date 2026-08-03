"use client";
import { siteConfig } from "@/frontend/data/siteConfig";
import MyOrdersHeader from "@/frontend/components/orders/MyOrdersHeader";
import OrderFilters from "@/frontend/components/orders/OrderFilters";
import OrderList from "@/frontend/components/orders/OrderList";
import AccountRouteGuard from "@/frontend/components/account/AccountRouteGuard";

export default function MyOrdersPage() {
  return (
    <AccountRouteGuard>
      <main className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <MyOrdersHeader />
          <OrderFilters />
          
          {/* The list uses a client component to handle fetching and pagination dynamically */}
          <OrderList />
        </div>
      </main>
    </AccountRouteGuard>
  );
}
