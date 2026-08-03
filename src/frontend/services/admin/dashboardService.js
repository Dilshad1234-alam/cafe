export async function fetchDashboardMetrics() {
  try {
    const response = await fetch('/api/admin/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
      },
      credentials: 'include', // Important to pass the HttpOnly auth cookie to the API route
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch dashboard metrics');
    }

    return data.data;
  } catch (error) {
    console.error('fetchDashboardMetrics Error:', error);
    throw error;
  }
}
