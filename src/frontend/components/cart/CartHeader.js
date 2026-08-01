"use client";

import { useCartStore } from "@/frontend/store/cartStore";
import { useState, useEffect } from "react";
import CartClearDialog from "./CartClearDialog";

export default function CartHeader() {
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!isMounted || totalQuantity === 0) return null;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-charcoal mb-2">
            Your Cart
          </h1>
          <p className="text-gray-500">
            Review your {totalQuantity} item{totalQuantity !== 1 ? 's' : ''} before checkout.
          </p>
        </div>
        
        <button
          onClick={() => setIsDialogOpen(true)}
          className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors self-start sm:self-auto"
        >
          Clear Cart
        </button>
      </div>

      <CartClearDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
}
