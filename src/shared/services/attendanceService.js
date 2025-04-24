import { API_ENDPOINTS } from "../../config/apiConfig";

export async function fetchAttendances(token) {
  try {
    const response = await fetch(API_ENDPOINTS.ATTENDANCES.GET_ALL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch attendances.");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch attendances error:", error);
    throw error;
  }
}

export async function deleteAttendance(id, token) {
  try {
    const response = await fetch(API_ENDPOINTS.ATTENDANCES.DELETE(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete attendance.");
    }

    return true;
  } catch (error) {
    console.error("Delete attendance error:", error);
    throw error;
  }
}

export const checkInAttendance = async (token) => {
  try {
    const response = await fetch(API_ENDPOINTS.ATTENDANCES.CHECK_IN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Use text instead of json to avoid crash
      console.error("Server error text:", errorText);
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating attendance:", error);
    throw new Error("Unable to create attendance");
  }
};

export const checkOutAttendance = async (id, token) => {
  console.log({ id }, { token });

  try {
    const response = await fetch(API_ENDPOINTS.ATTENDANCES.CHECK_OUT(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("data in checkOut", { data });

    return data;
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw new Error("Unable to update attendance");
  }
};
