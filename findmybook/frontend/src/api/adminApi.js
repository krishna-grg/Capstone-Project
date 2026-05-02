import { API_BASE_URL } from "./config";

// admin api, log in and authenticated requests (GET, POST, PUT)
export async function adminLogin(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid admin username or password");
  }

  return response.json();
}

export async function adminGet(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("GET request failed");
  }

  return response.json();
}

export async function adminPost(endpoint, data) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("POST request failed");
  }

  return response.json();
}

export async function adminPut(endpoint, data) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("PUT request failed");
  }

  return response.json();
}