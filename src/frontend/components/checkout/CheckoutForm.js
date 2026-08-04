"use client";

import { useEffect, useState } from "react";

import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/frontend/store/cartStore";
import { useAuth } from "@/frontend/hooks/useAuth";
import { useSettingsStore } from "@/frontend/store/settingsStore";
import { checkoutSchema } from "@/frontend/validation/checkoutSchema";

import { createOrder } from "@/frontend/services/orderService";

import CheckoutEmptyState from "./CheckoutEmptyState";
import ContactDetailsForm from "./ContactDetailsForm";
import OrderTypeSelector from "./OrderTypeSelector";
import DeliveryAddressForm from "./DeliveryAddressForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import { useRazorpayCheckout } from "@/frontend/hooks/useRazorpayCheckout";

export default function CheckoutForm() {
  const router = useRouter();
  
  // Auth state
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  // Cart state
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Validation checks
  const hasUnavailableItems = items.some(item => item.isAvailable === false);
  const isCartReady = totalQuantity > 0 && !hasUnavailableItems;

  const { settings } = useSettingsStore();
  const defaultOrderType = settings?.ordering?.deliveryEnabled === false ? "takeaway" : "delivery";
  const { initiateRazorpayPayment, isPaymentLoading } = useRazorpayCheckout();

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useReactHookForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer: {
        fullName: "",
        phone: "",
        email: ""
      },
      orderType: defaultOrderType,
      deliveryAddress: {
        house: "",
        area: "",
        landmark: "",
        city: "Gondia", // Defaulting to local cafe city
        state: "Maharashtra", // Defaulting to local state
        pincode: "",
        label: "Home"
      },
      paymentMethod: "cash_on_delivery"
    }
  });

  const currentOrderType = watch("orderType");
  const currentPaymentMethod = watch("paymentMethod");

  // Sync Payment Method with Order Type automatically ONLY IF invalid combination
  useEffect(() => {
    if (currentOrderType === "delivery" && currentPaymentMethod === "pay_at_pickup") {
      setValue("paymentMethod", "cash_on_delivery");
    } else if (currentOrderType === "takeaway" && currentPaymentMethod === "cash_on_delivery") {
      setValue("paymentMethod", "pay_at_pickup");
    }
  }, [currentOrderType, currentPaymentMethod, setValue]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      // Only set if not already dirty (we rely on reset for first load)
      reset({
        customer: {
          fullName: user.fullname || "",
          phone: user.phone || "",
          email: user.email || ""
        },
        orderType: defaultOrderType,
        deliveryAddress: {
          house: "",
          area: "",
          landmark: "",
          city: "Gondia",
          state: "Maharashtra",
          pincode: "",
          label: "Home"
        },
        paymentMethod: "cash_on_delivery"
      }, { keepDefaultValues: true });
    }
  }, [authLoading, isAuthenticated, user, reset]);

  // Handle Form Submission
  const onSubmit = async (data) => {
    // Construct the normalized order shape
    const orderPayload = {
      ...data,
      // Map razorpay to online for backend compatibility
      paymentMethod: data.paymentMethod === "razorpay" ? "online" : data.paymentMethod,
      // If takeaway, strip the delivery address completely
      deliveryAddress: data.orderType === "takeaway" ? null : data.deliveryAddress,
      items: items.map(item => ({
        itemKey: item.itemKey,
        productId: item.id,
        slug: item.slug || "",
        name: item.name,
        selectedSize: item.selectedSize || null,
        selectedAddOns: item.selectedAddOns || [],
        unitPrice: item.unitPrice || item.salePrice || item.originalPrice || 0,
        quantity: item.quantity,
        itemTotal: (item.unitPrice || item.salePrice || item.originalPrice || 0) * item.quantity
      }))
    };

    try {
      const response = await createOrder(orderPayload);
      
      // If Razorpay, initiate payment popup
      if (data.paymentMethod === "razorpay") {
        await initiateRazorpayPayment(
          response.order.orderNumber, 
          data.customer, 
          response.guestAccessToken
        );
        return; // Stop here, don't clear cart or redirect
      }

      // Otherwise, standard COD/Pickup flow
      toast.success(response.message || "Order placed successfully!");
      
      // Clear cart only on success
      clearCart();
      
      // Navigate to success page
      let successUrl = `/order-success/${response.order.orderNumber}`;
      if (response.guestAccessToken) {
        successUrl += `?guestToken=${encodeURIComponent(response.guestAccessToken)}`;
      }
      
      router.push(successUrl);
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Block rendering if cart is invalid or not yet mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-charcoal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (totalQuantity === 0) {
    return <CheckoutEmptyState />;
  }

  if (hasUnavailableItems) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-red-50 text-brand-red rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Unavailable Items in Cart</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Some items in your cart are currently unavailable. Please remove them to continue with checkout.
        </p>
        <button 
          onClick={() => router.push('/cart')}
          className="px-8 py-3 bg-brand-charcoal text-white rounded-xl font-bold"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
      
      {/* Form Area */}
      <div className="w-full lg:w-2/3">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <ContactDetailsForm register={register} errors={errors} />
          
          <OrderTypeSelector orderType={currentOrderType} setValue={setValue} />
          
          {currentOrderType === "delivery" && (
            <DeliveryAddressForm register={register} errors={errors} watch={watch} setValue={setValue} />
          )}
          
          <PaymentMethodSelector orderType={currentOrderType} setValue={setValue} />
        </form>
      </div>

      {/* Summary Area */}
      <div className="w-full lg:w-1/3">
        <CheckoutOrderSummary 
          items={items}
          subtotal={subtotal}
          isSubmitting={isSubmitting}
          isPaymentLoading={isPaymentLoading}
          orderType={currentOrderType}
          paymentMethod={currentPaymentMethod}
        />
      </div>

    </div>
  );
}
