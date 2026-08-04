export const fetchPaymentSummary = async () => {
  const res = await fetch("/api/admin/payments/summary", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch payment summary");
  }
  return res.json();
};

export const fetchAdminPayments = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/api/admin/payments?${query}` : `/api/admin/payments`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch payments");
  }
  return res.json();
};

export const fetchAdminPaymentDetails = async (id) => {
  const res = await fetch(`/api/admin/payments/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch payment details");
  }
  return res.json();
};
