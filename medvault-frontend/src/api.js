// src/api.js
const API_BASE_URL = "http://localhost:8080/api";

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // backend usually returns plain text for errors
    const text = await res.text();
    throw new Error(text || "Login failed");
  }

  // expect JSON: { message, userId, name, role }
  return res.json();
}
