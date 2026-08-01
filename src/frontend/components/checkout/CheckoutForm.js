"use client";

import { useEffect } from "react";

import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/frontend/store/cartStore";
import { useAuth } from "@/frontend/hooks/useAuth";
import { checkoutSchema } from "@/frontend/validation/checkoutSchema";

import CheckoutEmptyState from "./CheckoutEmptyState";
import ContactDetailsForm from "./ContactDetailsForm";
import OrderTypeSelector from "./OrderTypeSelector";
import DeliveryAddressForm from "./DeliveryAddressForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import CheckoutOrderSummary from "./CheckoutOrderSummary";

export default function CheckoutForm() {
  const router = useRouter();
  
  // Auth state
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  // Cart state
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const subtotal = useCartStore((state) => state.getSubtotal());
  
  // Validation checks
  const hasUnavailableItems = items.some(item => item.isAvailable === false);
  const isCartReady = totalQuantity > 0 && !hasUnavailableItems;

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
      orderType: "delivery",
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

  // Sync Payment Method with Order Type automatically
  useEffect(() => {
    if (currentOrderType === "delivery") {
      setValue("paymentMethod", "cash_on_delivery");
    } else {
      setValue("paymentMethod", "pay_at_pickup");
    }
  }, [currentOrderType, setValue]);

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
        orderType: "delivery",
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
      // If takeaway, strip the delivery address completely
      deliveryAddress: data.orderType === "takeaway" ? null : data.deliveryAddress,
      items: items.map(item => ({
        itemKey: item.itemKey,
        productId: item.id,
        slug: item.slug,
        name: item.name,
        selectedSize: item.selectedSize,
        selectedAddOns: item.selectedAddOns,
        unitPrice: item.unitPrice || item.salePrice || item.originalPrice,
        quantity: item.quantity,
        itemTotal: (item.unitPrice || item.salePrice || item.originalPrice) * item.quantity
      })),
      pricing: {
        subtotal,
        deliveryFee: null, // To be determined by backend
        tax: null, // To be determined by backend
        total: subtotal // Frontend estimate only
      }
    };

    console.log("Checkout Payload Ready:", orderPayload);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success response for this phase
    toast.success("Checkout details are ready. Order API integration is the next step.", {
      duration: 5000,
    });
    
    // Note: Intentionally NOT clearing the cart or redirecting in this phase 
    // as per strict instructions: "Do not create a database order. Do not clear the cart."
  };

  // Block rendering if cart is invalid
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
          orderType={currentOrderType}
        />
      </div>

    </div>
  );
}
