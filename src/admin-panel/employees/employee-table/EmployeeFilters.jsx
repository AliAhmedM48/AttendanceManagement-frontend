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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 space-x-2 md:space-x-0 md:gap-y-0 md:gap-2 items-center w-full outline-none xl:grid-cols-8">
      <input
        className="p-2 border rounded w-full grow md:bg-white col-span-3 md:col-span-2 xl:col-span-6"
        type="text"
        name="text"
        placeholder="Search by name, email, or phone"
        value={filters.text}
        onChange={handleChange}
        disabled={disabled}
      />

      <select
        name="gender"
        className="p-2 border rounded md:bg-white cursor-pointer"
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
        className="p-2 border rounded md:bg-white cursor-pointer"
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
