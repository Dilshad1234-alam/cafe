"use client";

import { useCartStore } from "@/frontend/store/cartStore";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartSummary() {
  const router = useRouter();
  const subtotal = useCartStore((state) => state.getSubtotal());
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  // Check if any items are unavailable
  const hasUnavailableItems = items.some(item => item.isAvailable === false);
  
  // NOTE: Final backend checkout must recalculate all totals.
  // This is a frontend representation only.
  const grandTotal = subtotal; // Assuming no fixed delivery/tax calculated on frontend yet

  const handleCheckout = () => {
    if (totalQuantity === 0) return;
    if (hasUnavailableItems) {
      alert("Please remove unavailable items before proceeding to checkout.");
      return;
    }
    router.push("/checkout");
  };

  if (totalQuantity === 0) return null;

  return (
    <div className="bg-brand-charcoal text-white rounded-[2rem] p-6 sm:p-8 shadow-xl sticky top-24">
      <h2 className="font-serif text-2xl font-bold mb-6 border-b border-white/10 pb-4">
        Order Summary
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span className="font-bold text-white">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Delivery</span>
          <span className="text-sm italic">Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Taxes</span>
          <span className="text-sm italic">Included where applicable</span>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total</span>
          <span className="font-black text-3xl text-brand-yellow">₹{grandTotal}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Final amount may vary based on delivery location and taxes.
        </p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleCheckout}
          disabled={hasUnavailableItems}
          className="w-full py-4 bg-brand-yellow text-brand-charcoal rounded-xl font-bold text-lg hover:bg-[#E5A800] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </button>
        
        {hasUnavailableItems && (
          <p className="text-brand-red text-sm font-medium text-center bg-brand-red/10 py-2 rounded-lg">
            Please remove unavailable items.
          </p>
        )}
        
        <Link 
          href="/menu"
          className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
