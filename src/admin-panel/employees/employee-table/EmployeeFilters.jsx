import React from "react";

const EmployeeFilters = ({
  filters,
  onChange,
  governorates = [],
  disabled,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="flex gap-4 items-center mb-4">
      <input
        className="p-2 border rounded w-full"
        type="text"
        name="text"
        placeholder="Search by name, email, or phone"
        value={filters.text}
        onChange={handleChange}
        disabled={disabled}
      />

      <select
        name="gender"
        className="p-2 border rounded"
        value={filters.gender}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        name="governorate"
        className="p-2 border rounded"
        value={filters.governorate}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">All Governorates</option>
        {governorates.map((gov) => (
          <option key={gov} value={gov}>
            {gov}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeFilters;
