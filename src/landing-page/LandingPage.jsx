import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import CompanyLogo from "../assets/Logo-New.svg";
import ThemeWrapper from "../shared/components/ThemeWrapper";
import { useAuth } from "../shared/contexts/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const navigateToPanel = () => {
    if (auth.role === "Admin") {
      navigate("/admin-panel");
    } else if (auth.role === "Employee") {
      navigate("/profile");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ThemeWrapper>
      <div className="flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src={CompanyLogo}
          alt="Company Logo"
          className="w-2/3 md:w-[300px] h-32 object-contain mb-10"
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-xl md:text-5xl font-bold mb-4">
            Welcome to the Attendance & Leave Tracking Platform
          </h1>
          <p className="text-xs md:text-lg text-gray-200 mb-8">
            Manage your employees' attendance and leave time with ease and
            clarity.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-xs md:text-base">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="bg-white text-[#1e165c] font-semibold px-6 py-3 rounded-full shadow-lg transition cursor-pointer hover:bg-[#0a9d81] hover:text-white"
            >
              {auth.isAuthenticated
                ? auth.role === "Admin"
                  ? "Go to Admin Panel"
                  : "Go to Profile"
                : "Go to Login"}
            </motion.button>

            {auth.isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition cursor-pointer hover:bg-red-500"
              >
                Log Out
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </ThemeWrapper>
  );
}
