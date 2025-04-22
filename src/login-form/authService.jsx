import { API_ENDPOINTS } from "../apiConfig";
export async function login(credentials) {
  try {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid credentials. Please try again.");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed. Please try again.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
