export async function fetchAdminCategories(searchParams = new URLSearchParams()) {
  const response = await fetch(`/api/admin/categories?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch categories');
  }
  return data.data;
}

export async function fetchAdminCategory(id) {
  const response = await fetch(`/api/admin/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch category');
  }
  return data.data;
}

export async function createAdminCategory(categoryData) {
  const response = await fetch('/api/admin/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(categoryData),
  });

  const data = await response.json();
  if (!response.ok) {
    if (data.errors) {
      const err = new Error(data.message);
      err.errors = data.errors;
      throw err;
    }
    throw new Error(data.message || 'Failed to create category');
  }
  return data.data;
}

export async function updateAdminCategory(id, categoryData) {
  const response = await fetch(`/api/admin/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(categoryData),
  });

  const data = await response.json();
  if (!response.ok) {
    if (data.errors) {
      const err = new Error(data.message);
      err.errors = data.errors;
      throw err;
    }
    throw new Error(data.message || 'Failed to update category');
  }
  return data.data;
}

export async function updateAdminCategoryStatus(id, isActive) {
  const response = await fetch(`/api/admin/categories/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ isActive }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update category status');
  }
  return data.data;
}

export async function deleteAdminCategory(id) {
  const response = await fetch(`/api/admin/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete category');
  }
  return data;
}
