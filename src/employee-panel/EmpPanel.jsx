import React from "react";
import { useAuth } from "../shared/contexts/AuthContext";
import Sidebar from "../shared/components/Sidebar";
import { CalendarCheck, UserCircle2, User2Icon, History } from "lucide-react";

function EmpPanel() {
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
    <div className="flex h-screen">
      <Sidebar items={menuItems} onLogout={logout} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Employee Panel
        </h1>
        <p className="text-gray-700">
          Select a section from the sidebar to manage employees or attendance
          records.
        </p>
      </main>
    </div>
  );
}

export default EmpPanel;
