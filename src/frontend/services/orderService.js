export const createOrder = async (checkoutData) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
    body: JSON.stringify(checkoutData),
  });

  const data = await response.json();

  if (!response.ok) {
    // Standardize error format if possible
    throw new Error(data.message || "Failed to create order");
  }

  return data; // Expected shape: { success: true, order: {...}, guestAccessToken?: "..." }
};

export const fetchOrderByNumber = async (orderNumber, guestToken = null) => {
  let url = `/api/orders/${orderNumber}`;
  if (guestToken) {
    url += `?guestToken=${encodeURIComponent(guestToken)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order");
  }

  return data; // { success: true, order: {...} }
};

export const fetchMyOrders = async (page = 1, limit = 10, status = null) => {
  let url = `/api/account/orders?page=${page}&limit=${limit}`;
  if (status && status !== "all") {
    url += `&status=${encodeURIComponent(status)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data; // { success: true, orders: [...], pagination: {...} }
};

export const fetchMyOrderDetails = async (orderNumber) => {
  // Dedicated function for customer order details
  // Uses the existing API route which authenticates securely via cookies
  const response = await fetch(`/api/orders/${orderNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order details");
  }

  return data;
};
