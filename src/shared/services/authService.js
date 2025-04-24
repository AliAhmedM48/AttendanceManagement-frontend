import { API_ENDPOINTS } from "../../config/apiConfig";

export async function login(credentials) {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function validateToken(token) {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.VALIDATE_TOKEN, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = "Login failed. Please try again.";

      const text = await response.text();
      if (text) {
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error("Error parsing response text:", parseError);
        }
      }

      if (response.status === 401) {
        errorMessage = "Invalid credentials. Please try again.";
      }

      throw new Error(errorMessage);
    }

    const resultText = await response.text();
    return resultText ? JSON.parse(resultText) : {};
  } catch (error) {
    throw error;
  }
}
