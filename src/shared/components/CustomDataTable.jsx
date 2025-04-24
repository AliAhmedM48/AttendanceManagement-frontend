import React from "react";
import { motion } from "framer-motion";
import DataTable from "react-data-table-component";

const CustomDataTable = ({
  columns,
  data,
  title = "",
  pending = false,
  rowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 15, 20],
  centerTitle = false,
}) => {
  console.log({ data });

  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-xl w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title && (
        <h2
          className={`text-2xl font-bold text-gray-800 mb-6 ${
            centerTitle ? "text-center" : ""
          }`}
        >
          {title}
        </h2>
      )}

      <DataTable
        columns={columns}
        data={data}
        progressPending={pending}
        pagination
        highlightOnHover
        striped
        responsive
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={rowsPerPageOptions}
        customStyles={{
          headCells: {
            style: {
              fontWeight: "600",
              fontSize: "15px",
              color: "#4B5563",
            },
          },
          rows: {
            style: {
              fontSize: "14px",
            },
          },
        }}
      />
    </motion.div>
  );
};

export default CustomDataTable;
