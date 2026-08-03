export async function fetchAdminCustomers(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/admin/customers${query ? `?${query}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to fetch customers");
  }

  return data;
}

export async function fetchAdminCustomerDetails(id) {
  const res = await fetch(`/api/admin/customers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to fetch customer details");
  }

  return data.data; // data contains { user, stats, recentOrders }
}

export async function updateAdminCustomerStatus(id, isActive) {
  const res = await fetch(`/api/admin/customers/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
    body: JSON.stringify({ isActive }),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to update customer status");
  }

  return data.customer;
}
