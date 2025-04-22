import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LogOut, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ items = [], onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
      setCollapsed(mediaQuery.matches);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <motion.aside
      initial={{ left: 0, width: 0 }}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-[#1e165c] text-white shadow-2xl z-40 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed ? (
            <div>
              <div className="text-lg font-bold">{auth.fullName}</div>
              <div className="text-sm text-white/70">{auth.role}</div>
            </div>
          ) : (
            <></>
          )}

          {isSmallScreen && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-white/70 cursor-pointer"
            >
              {collapsed ? (
                <ChevronsRight size={20} className="ml-3.5" />
              ) : (
                <ChevronsLeft size={20} />
              )}
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-white text-[#1e165c] font-semibold"
                    : "hover:bg-white/10"
                }`
              }
            >
              {item.icon && <item.icon size={20} />}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
