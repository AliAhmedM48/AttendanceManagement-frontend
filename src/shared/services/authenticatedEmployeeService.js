import { API_ENDPOINTS } from "../../config/apiConfig";

export async function getTodayAttendance(token) {
  try {
    const response = await fetch(
      API_ENDPOINTS.AUTH_ME_EMPLOYEES.GET_TODAY_ATTENDANCE,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const contentType = response.headers.get("content-type");
    const text = await response.text();
    console.log("text from getTodayAttendance", text);

    if (!response.ok) {
      throw new Error(text || "Failed to fetch today's attendance.");
    }

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Unexpected response format. Expected JSON.");
    }

    const data = JSON.parse(text);
    console.log("data from getTodayAttendance", data);

    return data;
  } catch (error) {
    console.error("Get today attendance error:", error);
    throw error;
  }
}

export async function getAttendancesHistory(token) {
  console.log("token from getAttendancesHistory", token);

  try {
    const response = await fetch(
      API_ENDPOINTS.AUTH_ME_EMPLOYEES.ATTENDANCES_HISTORY,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      }
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch attendances history."
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProfile(token) {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH_ME_EMPLOYEES.PROFILE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export const getSignature = async (token, signatureFileName) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.AUTH_ME_EMPLOYEES.GET_SIGNATURE(signatureFileName),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
  } catch (error) {
    console.error("Error fetching employee signature:", error);
    throw new Error("Unable to fetch employee signature");
  }
};
