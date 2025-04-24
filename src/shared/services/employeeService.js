import { API_ENDPOINTS } from "../../config/apiConfig";

export async function fetchEmployees(token) {
  try {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES.GET_ALL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch employees.");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch employees error:", error);
    throw error;
  }
}

export async function deleteEmployee(id, token) {
  try {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES.DELETE(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete employee.");
    }

    return true;
  } catch (error) {
    console.error("Delete employee error:", error);
    throw error;
  }
}

export const createEmployee = async (employeeData, token) => {
  try {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Unable to create employee");
  }
};

export const updateEmployee = async (id, employeeData, token) => {
  try {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES.UPDATE(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error("Unable to update employee");
  }
};

export const patchEmployeeSignature = async (userId, file, token) => {
  const formData = new FormData();
  formData.append("signature", file);

  try {
    const response = await fetch(
      API_ENDPOINTS.EMPLOYEES.UPDATE_SIGNATURE(userId),
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.r();
      throw new Error(errorData.message || "Failed to upload signature.");
    }

    return await response.text();
  } catch (error) {
    console.error("Signature upload error:", error);
    throw error;
  }
};
