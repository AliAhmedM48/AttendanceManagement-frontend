import { LayoutDashboard, CalendarCheck, Users } from "lucide-react";
import { useAuth } from "../shared/contexts/AuthContext";
import Sidebar from "../shared/components/Sidebar";

function AdminPanel() {
  const { logout } = useAuth();

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
    <div className="flex h-screen">
      <Sidebar items={menuItems} onLogout={logout} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p className="text-gray-700">
          Select a section from the sidebar to manage employees or attendance
          records.
        </p>
      </main>
    </div>
  );
}

export default AdminPanel;
