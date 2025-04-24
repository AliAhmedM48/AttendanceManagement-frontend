import { LayoutDashboard, CalendarCheck, Users } from "lucide-react";
import Sidebar from "../shared/components/Sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanelLayout() {
  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin-panel",
      icon: LayoutDashboard,
    },
    {
      label: "Employees",
      path: "/admin-panel/employees",
      icon: Users,
    },
    {
      label: "Attendance",
      path: "/admin-panel/attendance",
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="flex h-dvh">
      <Sidebar items={menuItems} />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default AdminPanelLayout;
