import React from "react";

const ConfirmDeleteToast = ({ onConfirm, onCancel }) => (
  <div className="flex flex-col">
    <span className="font-semibold mb-2">
      Are you sure you want to delete this employee?
    </span>
    <div className="flex justify-end gap-2 mt-2">
      <button
        onClick={onConfirm}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
      >
        Delete
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ConfirmDeleteToast;
