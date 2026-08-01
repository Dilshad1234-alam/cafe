import { requireAuthenticatedUser } from "@/backend/middleware/auth";
import { siteConfig } from "@/frontend/data/siteConfig";
import MyOrdersHeader from "@/frontend/components/orders/MyOrdersHeader";
import OrderFilters from "@/frontend/components/orders/OrderFilters";
import OrderList from "@/frontend/components/orders/OrderList";

export const metadata = {
  title: `My Orders | ${siteConfig.name}`,
  description: `View your past orders from ${siteConfig.name}.`,
};

export default async function MyOrdersPage() {
  // Protect page server-side. If not authenticated, this throws a redirect to /login
  await requireAuthenticatedUser();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <MyOrdersHeader />
        <OrderFilters />
        
        {/* The list uses a client component to handle fetching and pagination dynamically */}
        <OrderList />
      </div>
    </main>
  );
}
