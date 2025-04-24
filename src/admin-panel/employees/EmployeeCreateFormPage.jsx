import { useNavigate } from "react-router";
import EmployeeForm from "./EmployeeForm";
import { useAuth } from "../../shared/contexts/AuthContext";
import { createEmployee } from "../../shared/services/employeeService";
import { toast } from "react-toastify";

function EmployeeCreateFormPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  if (!auth.token) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (formData) => {
    console.log("from create page", { formData });

    try {
      const employee = await createEmployee(formData, auth.token);
      console.log("Employee created successfully:", employee);
      toast.success("Employee created successfully.");
      navigate("/admin-panel/employees");
    } catch (error) {
      console.error("Failed to create employee:", error);
      toast.error("Failed to create employee.");
    }
  };

  return (
    <div style={{ minHeight: "calc(100dvh - 48px)" }}>
      <h2 className="text-3xl font-bold text-center pt-6 pb-3 text-[#1e165c]">
        Employee Registration
      </h2>
      <EmployeeForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
}

export default EmployeeCreateFormPage;
