import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function EmployeeForm({
  onSubmit,
  initialData,
  mode = "create",
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    nationalId: "",
    signaturePath: "",
  });

  const navigate = useNavigate();

  const fields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Phone Number", name: "phoneNumber" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "National ID", name: "nationalId" },
    { label: "Signature Path", name: "signaturePath" },
  ];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ])
    );

    if (!trimmedData.firstName) {
      toast.error("First Name is required.");
      return;
    }

    if (!trimmedData.lastName) {
      toast.error("Last Name is required.");
      return;
    }

    if (!/^\d{11}$/.test(trimmedData.phoneNumber)) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
      toast.error("Invalid email address.");
      return;
    }

    if (mode === "create" && trimmedData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (!/^\d{14}$/.test(trimmedData.nationalId)) {
      toast.error("National ID must be exactly 14 digits.");
      return;
    }

    onSubmit(trimmedData);
    console.log("Form submitted", trimmedData);
  };

  const handleCancel = () => {
    navigate("/admin-panel/employees");
  };

  return (
    <div className="flex justify-center items-center">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4">
          {fields.slice(0, 2).map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              type={field.type || "text"}
            />
          ))}
        </div>

        {fields.slice(2).map((field) => (
          <FormInput
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            type={field.type || "text"}
          />
        ))}

        <div className="flex gap-4">
          <motion.div
            className="w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }} // عندما يمر الماوس على الزر
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="hover:scale-101"
              sx={{
                marginTop: 3,
                backgroundColor: "#1e165c",
                "&:hover": { backgroundColor: "#0a9d81" },
                paddingY: 1.5,
                fontWeight: "bold",
                borderRadius: "30px",
              }}
            >
              Submit
            </Button>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }} // عندما يمر الماوس على الزر
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              onClick={handleCancel}
              className="hover:scale-101"
              type="button"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 3,
                backgroundColor: "red",
                "&:hover": { backgroundColor: "red" },
                paddingY: 1.5,
                fontWeight: "bold",
                borderRadius: "30px",
              }}
            >
              Cancel
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
}

const FormInput = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      InputProps={{ style: { backgroundColor: "#fff" } }}
    />
  );
};
