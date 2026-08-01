"use client";

import { useCartStore } from "@/frontend/store/cartStore";
import { useEffect, useRef } from "react";
import { X, Trash2 } from "lucide-react";

export default function CartClearDialog({ isOpen, onClose }) {
  const clearCart = useCartStore((state) => state.clearCart);
  const dialogRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle focus trap basic
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Dialog */}
      <div 
        ref={dialogRef}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 text-brand-red rounded-full flex items-center justify-center mb-6">
            <Trash2 className="w-8 h-8" />
          </div>
          
          <h2 id="dialog-title" className="font-serif text-2xl font-bold text-brand-charcoal mb-2">
            Clear Cart?
          </h2>
          
          <p className="text-gray-500 mb-8">
            Are you sure you want to remove all items from your cart? This action cannot be undone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-brand-charcoal font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-1 py-3 px-4 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20"
            >
              Yes, Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
