export async function registerUser(data) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
}

export async function loginUser(data) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  if (result.token) {
    if (typeof window !== "undefined") sessionStorage.setItem("token", result.token);
  }
  return result;
}

export async function logoutUser() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  if (typeof window !== "undefined") sessionStorage.removeItem("token");
  return result;
}

export async function fetchCurrentUser() {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw result; // Throws { success: false, message: "Unauthenticated" } on 401
  }
  return result;
}
