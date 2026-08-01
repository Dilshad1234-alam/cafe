export async function fetchAdminReviews(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/admin/reviews${query ? `?${query}` : ""}`, {
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
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data;
}

export async function fetchAdminReview(id) {
  const res = await fetch(`/api/admin/reviews/${id}`, {
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
    throw new Error(data.message || "Failed to fetch review details");
  }

  return data.data; 
}

export async function moderateAdminReview(id, status, adminNote) {
  const res = await fetch(`/api/admin/reviews/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status, adminNote }),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    if (res.errors) {
      throw { message: data.message, errors: res.errors };
    }
    throw new Error(data.message || "Failed to moderate review");
  }

  return data.review;
}

export async function deleteAdminReview(id) {
  const res = await fetch(`/api/admin/reviews/${id}`, {
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
    throw new Error(data.message || "Failed to delete review");
  }

  return data;
}
