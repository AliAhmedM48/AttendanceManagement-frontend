export const tableColumns = [
  { name: "ID", selector: (row) => row.id, sortable: true, width: "70px" },
  { name: "Full Name", selector: (row) => row.fullName, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  {
    name: "Phone",
    selector: (row) => row.phoneNumber || "N/A",
    sortable: true,
  },
  { name: "National ID", selector: (row) => row.nationalId || "N/A" },
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
  },
  { name: "Gender", selector: (row) => row.gender || "N/A", sortable: true },
  {
    name: "Governorate",
    selector: (row) => row.governorate || "N/A",
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => (row.createdAt ? formatDateTime(row.createdAt) : "N/A"),
    sortable: true,
    width: "180px", // أو "200px"
  },
  {
    name: "Updated At",
    selector: (row) => (row.updatedAt ? formatDateTime(row.updatedAt) : "—"),
    sortable: true,
    width: "180px",
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
  },
];
