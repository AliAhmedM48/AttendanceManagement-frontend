// import React from "react";
// import DataTable from "react-data-table-component";

// const EmployeeTable = ({ employees, columns, pending }) => {
//   return (
//     <DataTable
//       columns={columns}
//       data={employees}
//       progressPending={pending}
//       pagination
//       highlightOnHover
//       striped
//       responsive
//       paginationPerPage={10}
//       paginationRowsPerPageOptions={[5, 10, 15, 20]}
//     />
//   );
// };

// export default EmployeeTable;

import React from "react";
import CustomDataTable from "../../../shared/components/CustomDataTable";

const EmployeeTable = ({ employees, columns, pending }) => {
  return (
    <CustomDataTable
      // title="👥 Employees"
      columns={columns}
      data={employees}
      pending={pending}
      rowsPerPage={10}
      rowsPerPageOptions={[5, 7, 10, 15]}
      centerTitle
    />
  );
};

export default EmployeeTable;
