"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/frontend/store/cartStore";
import { calculateConfiguredUnitPrice, calculateItemTotal } from "@/frontend/utils/productPricing";
import SizeSelector from "./SizeSelector";
import AddOnSelector from "./AddOnSelector";
import QuantitySelector from "./QuantitySelector";
import { ShoppingBag, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function ProductPurchasePanel({ product }) {
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);

  // Initialize state
  const defaultSize = product.sizes?.length > 0 ? product.sizes[0] : null;
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Handlers
  const handleToggleAddOn = (addOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.some(a => a.id === addOn.id);
      if (exists) {
        return prev.filter(a => a.id !== addOn.id);
      } else {
        return [...prev, addOn];
      }
    });
  };

  // Calculations
  const configuredUnitPrice = calculateConfiguredUnitPrice(product, selectedSize, selectedAddOns);
  const itemTotal = calculateItemTotal(configuredUnitPrice, quantity);

  // Actions
  const getCartConfig = () => ({
    selectedSize,
    selectedAddOns,
    configuredUnitPrice
  });

  const handleAddToCart = () => {
    addItem(product, quantity, getCartConfig());
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, getCartConfig());
    // In Tasty Zone, if a cart page exists we go there, else stay or go checkout
    // We will push to /checkout if it existed, otherwise just add to cart and open it
    toast.success(`${quantity} x ${product.name} added to cart`);
    
    // For now, if we have a cart page, router.push('/cart').
    // Since we didn't see a cart page earlier in list_dir, we might just stay and rely on navbar cart.
    // If a checkout page is available, navigate there.
  };

  // If not available, render disabled state
  if (!product.isAvailable) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center text-gray-500 font-semibold">
        Sorry, this item is currently unavailable.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
      
      <SizeSelector 
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />
      
      <AddOnSelector 
        addOns={product.addOns}
        selectedAddOns={selectedAddOns}
        onToggleAddOn={handleToggleAddOn}
      />
      
      <div className="pt-6 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <span className="text-gray-500 font-medium block mb-1">Total Amount</span>
            <div className="flex items-end gap-2">
              <span className="font-bold text-4xl text-brand-charcoal">₹{itemTotal}</span>
              {quantity > 1 && (
                <span className="text-gray-400 mb-1">(₹{configuredUnitPrice} each)</span>
              )}
            </div>
          </div>
          
          <div>
            <span className="text-gray-500 font-medium block mb-2 sm:mb-1">Quantity</span>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-brand-charcoal text-brand-charcoal bg-white rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-900 shadow-lg shadow-brand-charcoal/20 hover:-translate-y-0.5 transition-all"
          >
            <CreditCard className="w-5 h-5" />
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
}
