"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, AlertCircle } from "lucide-react";
import { useCartStore } from "@/frontend/store/cartStore";

export default function CartItem({ item }) {
  const { removeItem, incrementQuantity, decrementQuantity } = useCartStore();

  const isUnavailable = item.isAvailable === false;
  
  // Extract configuration safely based on new schema vs old schema
  const sizeText = item.selectedSize ? item.selectedSize.name : null;
  const addOnsText = item.selectedAddOns?.length 
    ? item.selectedAddOns.map(a => a.name).join(", ")
    : null;

  // Use the stored unitPrice which already accounts for size/addons
  const price = item.unitPrice || item.salePrice || item.originalPrice;
  const itemTotal = price * item.quantity;

  return (
    <div className={`p-4 sm:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 ${isUnavailable ? 'opacity-70' : ''}`}>
      
      {/* Product Image */}
      <div className="relative w-full sm:w-28 h-28 sm:h-auto shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        <Image 
          src={item.image || "/window.svg"}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
        />
        {isUnavailable && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-brand-red" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <Link href={`/menu/${item.slug}`} className="hover:text-brand-yellow transition-colors">
              <h3 className="font-bold text-lg text-brand-charcoal leading-tight mb-1">
                {item.name}
              </h3>
            </Link>
            
            {/* Variations/Addons */}
            <div className="text-sm text-gray-500 mb-2 space-y-0.5">
              {sizeText && <p>Size: {sizeText}</p>}
              {addOnsText && <p className="line-clamp-2">Add-ons: {addOnsText}</p>}
            </div>
            
            {isUnavailable && (
              <span className="inline-block px-2 py-1 bg-red-50 text-brand-red text-xs font-bold rounded">
                Currently Unavailable
              </span>
            )}
          </div>
          
          <button 
            onClick={() => removeItem(item.itemKey)}
            className="text-gray-400 hover:text-brand-red transition-colors p-2 -mr-2"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing and Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="font-bold text-brand-charcoal text-lg">
            ₹{itemTotal}
            {item.quantity > 1 && (
              <span className="text-xs text-gray-400 font-normal ml-2">
                (₹{price} each)
              </span>
            )}
          </div>
          
          {/* Quantity Controls */}
          {!isUnavailable && (
            <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 p-1">
              <button 
                onClick={() => decrementQuantity(item.itemKey)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-brand-charcoal"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-brand-charcoal">
                {item.quantity}
              </span>
              <button 
                onClick={() => incrementQuantity(item.itemKey)}
                disabled={item.quantity >= 20}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-brand-charcoal"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
