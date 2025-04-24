import React from "react";
import { useAuth } from "../shared/contexts/AuthContext";
import Sidebar from "../shared/components/Sidebar";
import { CalendarCheck, UserCircle2, User2Icon, History } from "lucide-react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

function EmployeePanelLayout() {
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Profile",
      path: "/profile",
      icon: User2Icon,
    },
    {
      label: "Check In/Out",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      label: "Attendance History",
      path: "/attendance-history",
      icon: History,
    },
  ];

  return (
    <div className="flex h-dvh">
      <Sidebar items={menuItems} />
      <main className="flex-1 p-0 md:p-6 overflow-auto">
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default EmployeePanelLayout;
