import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import EmployeeForm from "./EmployeeForm";
import { useAuth } from "../../shared/contexts/AuthContext";
import { updateEmployee } from "../../shared/services/employeeService";
import { toast } from "react-toastify";

function EmployeeEditFormPage() {
  const location = useLocation();
  const employee = location.state?.employee;
  const navigate = useNavigate();

  const { auth } = useAuth();
  if (!auth.token) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (formData) => {
    try {
      const employee = await updateEmployee(formData.id, formData, auth.token);
      console.log("Employee updated successfully:", employee);
      toast.success("Employee updated successfully.");

      navigate("/admin-panel/employees");
    } catch (error) {
      console.error("Failed to update employee:", error);
      toast.error("Failed to update employee.");
    }
  };

  return (
    <div style={{ minHeight: "calc(100dvh - 48px)" }}>
      <h2 className="text-3xl font-bold text-center pt-6 pb-3 text-[#1e165c]">
        Update Employee Details
      </h2>
      <EmployeeForm
        onSubmit={handleSubmit}
        initialData={employee}
        mode="edit"
      />
    </div>
  );
}

export default EmployeeEditFormPage;
