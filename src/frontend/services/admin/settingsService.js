export async function fetchAdminSettings() {
  const res = await fetch(`/api/admin/settings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    cache: 'no-store'
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || "Failed to fetch settings");
  }

  return data.data;
}

export async function updateAdminSettings(settingsData) {
  const res = await fetch(`/api/admin/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(settingsData),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/admin/login';
    }
    if (data.errors) {
      throw { message: data.message, errors: data.errors };
    }
    throw new Error(data.message || "Failed to update settings");
  }

  return data.data;
}
