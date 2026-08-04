export const loadRazorpayCheckout = () => {
  return new Promise((resolve) => {
    // Check if we are in the browser
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    // Reuse existing script if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};
