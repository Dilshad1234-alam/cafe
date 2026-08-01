export async function fetchAdminOrders(searchParams = {}) {
  const query = new URLSearchParams(searchParams).toString();
  const url = `/api/admin/orders${query ? `?${query}` : ""}`;
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    // Next.js client-side fetch includes credentials automatically, but we can be explicit
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data;
}

export async function fetchAdminOrderDetails(orderNumber) {
  const res = await fetch(`/api/admin/orders/${orderNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch order details");
  }

  return data.order;
}

export async function updateAdminOrderStatus(orderNumber, status, note = "") {
  const res = await fetch(`/api/admin/orders/${orderNumber}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status, note }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data.order;
}

export async function updateAdminPaymentStatus(orderNumber, paymentStatus) {
  const res = await fetch(`/api/admin/orders/${orderNumber}/payment-status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ paymentStatus }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update payment status");
  }

  return data.order;
}
