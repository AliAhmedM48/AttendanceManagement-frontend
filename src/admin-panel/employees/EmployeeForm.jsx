import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getSignature } from "../../shared/services/authenticatedEmployeeService";
import { useAuth } from "../../shared/contexts/AuthContext";

const fields = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Phone Number", name: "phoneNumber" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
  { label: "National ID", name: "nationalId" },
];

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
    signaturePath: null,
    signatureFile: null,
  });

  const fileInputRef = useRef(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  console.log("token", auth.token, "formdata from form component", formData);
  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const signatureblob = await getSignature(
          auth.token,
          initialData.signaturePath
        );
        setFormData((prev) => ({
          ...prev,
          ...initialData,
          signaturePath: signatureblob,
        }));
      } catch (error) {
        console.error("Error fetching signature:", error);
      }
    };
    fetchSignature();
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        signaturePath: URL.createObjectURL(file),
        signatureFile: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ])
    );

    if (!trimmedData.firstName) return toast.error("First Name is required.");
    if (!trimmedData.lastName) return toast.error("Last Name is required.");
    if (!/^\d{11}$/.test(trimmedData.phoneNumber))
      return toast.error("Phone number must be exactly 11 digits.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email))
      return toast.error("Invalid email address.");
    if (mode === "create" && trimmedData.password.length < 6)
      return toast.error("Password must be at least 6 characters.");
    if (!/^\d{14}$/.test(trimmedData.nationalId))
      return toast.error("National ID must be exactly 14 digits.");

    onSubmit(trimmedData);
    console.log("Submitted data:", { trimmedData });
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
              {...field}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        {fields.slice(2).map((field) => (
          <FormInput
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Signature Image
          </label>
          {formData.signaturePath && (
            <div className="mt-4 text-center">
              <img
                src={formData?.signaturePath}
                alt="Signature Preview"
                className="w-48 h-auto mx-auto border rounded shadow my-4"
              />
            </div>
          )}
          <div
            onClick={() => fileInputRef.current.click()}
            className="flex justify-center items-center h-40 text-gray-500 bg-gray-50 border border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="text-center text-md px-4">
              {formData.signaturePath
                ? "Click to update your signature"
                : "No signature uploaded. Click to upload one."}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <motion.div className="w-full" whileHover={{ scale: 1.05 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1e165c",
                "&:hover": { backgroundColor: "#0a9d81" },
                py: 1.5,
                fontWeight: "bold",
                borderRadius: "30px",
              }}
            >
              Submit
            </Button>
          </motion.div>

          <motion.div className="w-full" whileHover={{ scale: 1.05 }}>
            <Button
              onClick={handleCancel}
              type="button"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "red",
                "&:hover": { backgroundColor: "darkred" },
                py: 1.5,
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
