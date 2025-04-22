import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import ThemeWrapper from "../shared/components/ThemeWrapper";
import { login } from "./authService";
import { useNavigate } from "react-router";
import { useAuth } from "../shared/contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login: setAuth, auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const data = await login({ email, password });
      toast.success("Login successful!", {
        onOpen: () => {
          if (data.role === "Admin") {
            navigate("/admin-panel");
          } else if (data.role === "Employee") {
            navigate("/profile");
          }

          setAuth({
            isAuthenticated: true,
            role: data.role,
            token: data.token,
            fullName: data.fullName,
          });
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ThemeWrapper>
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white text-[#1e165c] rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-[#1e165c] text-white py-2 rounded-md font-semibold hover:bg-[#0a9d81] transition cursor-pointer"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </ThemeWrapper>
  );
}
