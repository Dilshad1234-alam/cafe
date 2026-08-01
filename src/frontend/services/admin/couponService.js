export async function fetchAdminCoupons(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/admin/coupons${query ? `?${query}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to fetch coupons");
  }

  return data;
}

export async function fetchAdminCoupon(id) {
  const res = await fetch(`/api/admin/coupons/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to fetch coupon details");
  }

  return data.data; 
}

export async function createAdminCoupon(couponData) {
  const res = await fetch(`/api/admin/coupons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(couponData),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    if (res.errors) {
      throw { message: data.message, errors: res.errors };
    }
    throw new Error(data.message || "Failed to create coupon");
  }

  return data.coupon;
}

export async function updateAdminCoupon(id, couponData) {
  const res = await fetch(`/api/admin/coupons/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(couponData),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    if (res.errors) {
      throw { message: data.message, errors: res.errors };
    }
    throw new Error(data.message || "Failed to update coupon");
  }

  return data.coupon;
}

export async function updateAdminCouponStatus(id, isActive) {
  const res = await fetch(`/api/admin/coupons/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ isActive }),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to update coupon status");
  }

  return data.coupon;
}

export async function deleteAdminCoupon(id) {
  const res = await fetch(`/api/admin/coupons/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to delete coupon");
  }

  return data;
}
