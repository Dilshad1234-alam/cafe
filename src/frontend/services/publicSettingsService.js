export async function fetchPublicSettings() {
  // Use a base URL helper if available, otherwise relative works for client components.
  // For server components in Next.js, we might need absolute URL if not using native fetch correctly,
  // but relative usually works in client. To be safe, we'll use a relative path and it should be called from client 
  // or a server component that configures the URL.
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  
  try {
    const res = await fetch(`${baseUrl}/api/settings/public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      next: { revalidate: 60 } // Revalidate every 60 seconds to avoid hitting DB constantly
    });

    if (!res.ok) {
      console.error("Failed to fetch public settings, status:", res.status);
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching public settings:", error);
    return null;
  }
}
