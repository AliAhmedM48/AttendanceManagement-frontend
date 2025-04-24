import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";
import {
  fetchEmployees,
  deleteEmployee,
} from "../../../shared/services/employeeService";
import { useAuth } from "../../../shared/contexts/AuthContext";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";
import ConfirmDeleteToast from "./ConfirmDeleteToast";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { formatDate, formatDateTime } from "../../../shared/utils";
import { getSignature } from "../../../shared/services/authenticatedEmployeeService";

function Employees() {
  const { auth } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [pending, setPending] = useState(true);
  const [signaturePathList, setSignaturePathList] = useState(null);

  const [filters, setFilters] = useState({
    text: "",
    gender: "",
    governorate: "",
    age: "",
    createdAt: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await fetchEmployees(auth.token);
        setEmployees(data);

        if (data.length > 0) {
          const signaturePaths = await Promise.all(
            data.map(async (e) => {
              try {
                const url = await getSignature(auth.token, e.signaturePath);
                return { id: e.id, url };
              } catch {
                return { id: e.id, url: null };
              }
            })
          );

          const signatureMap = {};
          signaturePaths.forEach(({ id, url }) => {
            signatureMap[id] = url;
          });

          setSignaturePathList(signatureMap);
        }
      } catch (error) {
        toast.error("Failed to load employees");
      } finally {
        setPending(false);
      }
    }
    loadEmployees();
  }, [auth.token]);

  const handleEdit = (employee) => {
    navigate(`/admin-panel/employees/${employee.id}/edit`, {
      state: { employee },
    });
  };

  const handleDeleteClick = (id) => {
    const toastId = `confirm-delete-${id}`;
    if (!toast.isActive(toastId)) {
      toast.info(
        <ConfirmDeleteToast
          onConfirm={() => {
            confirmDelete(id);
            toast.dismiss(toastId);
          }}
          onCancel={() => toast.dismiss(toastId)}
        />,
        {
          toastId,
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        }
      );
    }
  };

  const confirmDelete = async (id) => {
    try {
      await deleteEmployee(id, auth.token);
      setEmployees(employees.filter((e) => e.id !== id));
      toast.success("Employee removed.");
    } catch {
      toast.error("Unable to remove employee. Please try again.");
    }
  };

  const filteredItems = employees.filter((emp) => {
    const textMatch =
      emp.fullName?.toLowerCase().includes(filters.text.toLowerCase()) ||
      emp.email?.toLowerCase().includes(filters.text.toLowerCase()) ||
      emp.phoneNumber?.toLowerCase().includes(filters.text.toLowerCase());

    const genderMatch = filters.gender === "" || emp.gender === filters.gender;
    const governorateMatch =
      filters.governorate === "" || emp.governorate === filters.governorate;

    return textMatch && genderMatch && governorateMatch;
  });

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phoneNumber || "N/A",
      sortable: true,
    },
    {
      name: "National ID",
      selector: (row) => row.nationalId || "N/A",
    },
    {
      name: "Birth Date",
      selector: (row) => (row.birthDate ? formatDate(row.birthDate) : "N/A"),
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => {
        if (!row.birthDate) return "N/A";
        const birth = new Date(row.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        return age;
      },
      sortable: true,
      width: "fit-content",
    },
    {
      name: "Gender",
      selector: (row) => row.gender || "N/A",
      sortable: true,
      width: "fit-content",
    },
    {
      name: "Governorate",
      selector: (row) => row.governorate || "N/A",
      sortable: true,
      width: "fit-content",
    },
    {
      name: "Signature",
      selector: (row) =>
        signaturePathList && signaturePathList[row.id] ? (
          <img
            src={signaturePathList[row.id]}
            alt="Signature"
            className="w-20 h-auto border rounded shadow-sm"
          />
        ) : (
          "N/A"
        ),
      sortable: false,
      width: "fit-content",
    },
    {
      name: "Created At",
      selector: (row) =>
        row.createdAt ? formatDateTime(row.createdAt) : "N/A",
      sortable: true,
      width: "fit-content",
    },
    {
      name: "Updated At",
      selector: (row) => (row.updatedAt ? formatDateTime(row.updatedAt) : "—"),
      sortable: true,
      width: "fit-content",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-4">
          <Pencil
            className="text-blue-600 cursor-pointer hover:text-blue-800 hover:scale-130"
            size={18}
            onClick={() => handleEdit(row)}
          />
          <Trash2
            className="text-red-600 cursor-pointer hover:text-red-800 hover:scale-130"
            size={18}
            onClick={() => handleDeleteClick(row.id)}
          />
        </div>
      ),
      ignoreRowClick: true,
      width: "fit-content",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employees</h2>
        <NavLink
          to={"/admin-panel/employees/create"}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 cursor-pointer"
        >
          <UserPlus size={18} />
          <span className="hidden sm:inline">Create New Employee</span>
        </NavLink>
      </div>

      <EmployeeFilters
        filters={filters}
        onChange={setFilters}
        governorates={[...new Set(employees.map((e) => e.governorate))]}
        disabled={employees.length === 0}
      />

      <EmployeeTable
        employees={filteredItems}
        columns={columns}
        pending={pending}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
}

export default Employees;
