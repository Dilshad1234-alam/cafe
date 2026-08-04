import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/frontend/store/cartStore";
import { loadRazorpayCheckout } from "../utils/loadRazorpayCheckout";
import { createRazorpayPaymentOrder, verifyRazorpayPayment } from "../services/razorpayService";

export const useRazorpayCheckout = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  const initiateRazorpayPayment = async (orderNumber, customerData, guestToken = null) => {
    setIsPaymentLoading(true);

    try {
      // 1. Load Razorpay Script
      const isScriptLoaded = await loadRazorpayCheckout();
      if (!isScriptLoaded) {
        toast.error("Unable to load online payment. Please try again.");
        setIsPaymentLoading(false);
        return;
      }

      // 2. Call create-order API (Step 1)
      const payload = { orderNumber };
      if (guestToken) {
        payload.guestToken = guestToken;
      }

      const { status, data } = await createRazorpayPaymentOrder(payload);

      if (status !== 201 || !data.success) {
        toast.error(data.message || "Unable to start payment for this order.");
        setIsPaymentLoading(false);
        return;
      }

      const paymentOrder = data.paymentOrder;

      // 3. Build Options and Open Popup
      const options = {
        key: paymentOrder.keyId,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: "The Tasty Zone",
        description: "Cafe Order Payment",
        order_id: paymentOrder.razorpayOrderId,
        prefill: {
          name: customerData.fullName || "",
          email: customerData.email || "",
          contact: customerData.phone || "",
        },
        notes: {
          internalOrderNumber: paymentOrder.internalOrderNumber,
        },
        theme: {
          color: "#1F2937", // brand-charcoal
        },
        handler: async function (response) {
          try {
            toast.loading("Verifying Payment...", { id: "verify-toast" });

            const verifyPayload = {
              internalOrderNumber: paymentOrder.internalOrderNumber,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            if (guestToken) {
              verifyPayload.guestToken = guestToken;
            }

            const { status, data } = await verifyRazorpayPayment(verifyPayload);

            if (status !== 200 || !data.success) {
              toast.error(
                data.message || "Payment could not be verified. Please contact the cafe before trying again.",
                { id: "verify-toast" }
              );
              setIsPaymentLoading(false);
              return;
            }

            // Success!
            toast.success("Payment verified and order placed successfully.", { id: "verify-toast" });
            clearCart();
            
            let successUrl = `/order-success/${paymentOrder.internalOrderNumber}`;
            if (guestToken) {
              successUrl += `?guestToken=${encodeURIComponent(guestToken)}`;
            }
            
            router.push(successUrl);
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Payment verification is taking longer than expected. Please try verification again.", { id: "verify-toast" });
            setIsPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment window closed. You can try again.");
            setIsPaymentLoading(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      
      razorpayInstance.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        toast.error(response.error.description || "Payment failed. Please try again.");
      });

      razorpayInstance.open();

    } catch (error) {
      console.error("Razorpay initiation error:", error);
      toast.error("Unable to start payment for this order.");
      setIsPaymentLoading(false);
    }
  };

  return {
    initiateRazorpayPayment,
    isPaymentLoading,
  };
};
