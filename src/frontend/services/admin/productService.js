export async function fetchAdminProducts(searchParams = new URLSearchParams()) {
  const response = await fetch(`/api/admin/products?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch products');
  }
  return data.data;
}

export async function fetchAdminProduct(id) {
  const response = await fetch(`/api/admin/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch product');
  }
  return data.data;
}

export async function createAdminProduct(productData) {
  const response = await fetch('/api/admin/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(productData),
  });

  const data = await response.json();
  if (!response.ok) {
    if (data.errors) {
      const err = new Error(data.message);
      err.errors = data.errors;
      throw err;
    }
    throw new Error(data.message || 'Failed to create product');
  }
  return data.data;
}

export async function updateAdminProduct(id, productData) {
  const response = await fetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(productData),
  });

  const data = await response.json();
  if (!response.ok) {
    if (data.errors) {
      const err = new Error(data.message);
      err.errors = data.errors;
      throw err;
    }
    throw new Error(data.message || 'Failed to update product');
  }
  return data.data;
}

export async function updateAdminProductAvailability(id, isAvailable) {
  const response = await fetch(`/api/admin/products/${id}/availability`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ isAvailable }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update product availability');
  }
  return data.data;
}

export async function updateAdminProductFeatured(id, isFeatured) {
  const response = await fetch(`/api/admin/products/${id}/featured`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ isFeatured }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update product featured status');
  }
  return data.data;
}

export async function deleteAdminProduct(id) {
  const response = await fetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete product');
  }
  return data;
}
