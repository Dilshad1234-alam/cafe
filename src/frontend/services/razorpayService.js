export const createRazorpayPaymentOrder = async (payload) => {
  const response = await fetch("/api/payments/razorpay/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { status: response.status, data };
};

export const verifyRazorpayPayment = async (payload) => {
  const response = await fetch("/api/payments/razorpay/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { status: response.status, data };
};
