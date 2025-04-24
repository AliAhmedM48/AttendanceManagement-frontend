import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import EmployeeForm from "./EmployeeForm";
import { useAuth } from "../../shared/contexts/AuthContext";
import { toast } from "react-toastify";
import { updateEmployee } from "../../shared/services/employeeService";

function EmployeeEditFormPage() {
  const location = useLocation();
  const employee = location.state?.employee;
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async (formData) => {
    console.log("from edit page", { formData });

    try {
      const updatedEmployee = await updateEmployee(
        formData.id,
        formData,
        auth.token
      );
      console.log("Employee updated successfully:", updatedEmployee);
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
