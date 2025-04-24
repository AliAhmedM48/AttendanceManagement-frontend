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
  console.log({ employeeData });
  console.log({ token });

  const formData = new FormData();
  formData.append("firstName", employeeData.firstName);
  formData.append("lastName", employeeData.lastName);
  formData.append("phoneNumber", employeeData.phoneNumber);
  formData.append("email", employeeData.email);
  formData.append("password", employeeData.password);
  formData.append("nationalId", employeeData.nationalId);

  if (employeeData.signatureFile) {
    formData.append("signature", employeeData.signatureFile);
  }

  try {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES.CREATE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create employee.");
    }
    console.log({ response });

    return data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Unable to create employee");
  }
};
export const updateEmployee = async (id, employeeData, token) => {
  const formData = new FormData();

  // Append employee data
  formData.append("firstName", employeeData.firstName);
  formData.append("lastName", employeeData.lastName);
  formData.append("email", employeeData.email);
  formData.append("phoneNumber", employeeData.phoneNumber);
  formData.append("nationalId", employeeData.nationalId);
  if (employeeData.signatureFile) {
    formData.append("signature", employeeData.signatureFile);
  }
  if (employeeData.password) {
    formData.append("password", employeeData.password);
  }

  console.log({ employeeData });
  formData.forEach((value, key) => console.log(key, value));

  try {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES.UPDATE(id), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update employee.");
    }

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
