import { siteConfig } from "@/frontend/data/siteConfig";
import CartHeader from "@/frontend/components/cart/CartHeader";
import CartItemList from "@/frontend/components/cart/CartItemList";
import CartSummary from "@/frontend/components/cart/CartSummary";
import CartEmptyState from "@/frontend/components/cart/CartEmptyState";
import CartRecommendations from "@/frontend/components/cart/CartRecommendations";

export const metadata = {
  title: `Your Cart | ${siteConfig.name}`,
  description: `Review your cart items and proceed to checkout at ${siteConfig.name}.`,
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* We use a client wrapper logic internally inside these components to handle empty state */}
        <CartHeader />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          {/* Main Cart Area */}
          <div className="w-full lg:w-2/3">
            <CartEmptyState />
            <CartItemList />
          </div>

          {/* Sticky Summary Area */}
          <div className="w-full lg:w-1/3">
            <CartSummary />
          </div>

        </div>

        {/* Recommendations Area */}
        <CartRecommendations />

      </div>
    </main>
  );
}
