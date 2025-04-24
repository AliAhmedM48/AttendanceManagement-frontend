import React from "react";
import { format } from "date-fns";
import CustomDataTable from "../../shared/components/CustomDataTable";

const AttendanceTable = ({ records = [], pending = false }) => {
  const columns = [
    {
      name: "Date",
      selector: (row) => format(new Date(row.checkInTime), "dd-MM-yyyy"),
      sortable: true,
    },
    {
      name: "Check In",
      selector: (row) => format(new Date(row.checkInTime), "HH:mm"),
    },
    {
      name: "Check Out",
      selector: (row) =>
        row.checkOutTime ? format(new Date(row.checkOutTime), "HH:mm") : "—",
    },
    {
      name: "Worked Hours",
      selector: (row) =>
        row.totalWorkedHours !== null ? row.totalWorkedHours.toFixed(2) : "—",
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-nowrap text-xs font-medium ${
            row.checkOutTime
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {row.checkOutTime ? "Checked Out" : "Working"}
        </span>
      ),
      center: true,
    },
  ];

  return (
    <CustomDataTable
      columns={columns}
      data={records}
      pending={pending}
      rowsPerPage={7}
      rowsPerPageOptions={[5, 7, 10, 15]}
      centerTitle
    />
  );
};

export default AttendanceTable;
