import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import LoginForm from "./login-form/LoginForm";
import LandingPage from "./landing-page/LandingPage";
import RedirectIfAuthenticated from "./shared/components/RedirectIfAuthenticated";
import AdminPanelLayout from "./admin-panel/AdminPanelLayout";
import Dashboard from "./admin-panel/Dashboard";
import Attendance from "./admin-panel/attendance/Attendance";
import EmployeeEditFormPage from "./admin-panel/employees/EmployeeEditFormPage";
import EmployeeCreateFormPage from "./admin-panel/employees/EmployeeCreateFormPage";
import Employees from "./admin-panel/employees/employee-table/Employees";
import EmployeePanelLayout from "./employee-panel/EmployeePanelLayout";
import ProfilePage from "./employee-panel/profile/ProfilePage";
import CheckInOut from "./employee-panel/check-in-out/CheckInOut";
import AttendanceHistory from "./employee-panel/attendance-history/AttendanceHistory";

const AppRouter = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <LoginForm />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/admin-panel",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]}>
        <AdminPanelLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin-panel/employees",
        element: <Employees />,
      },
      {
        path: "/admin-panel/attendance",
        element: <Attendance />,
      },
      {
        path: "/admin-panel/employees/create",
        element: <EmployeeCreateFormPage />,
      },
      {
        path: "/admin-panel/employees/:employeeId/edit",
        element: <EmployeeEditFormPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["Employee"]}>
        <EmployeePanelLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/attendance",
        element: <CheckInOut />,
      },
      {
        path: "/attendance-history",
        element: <AttendanceHistory />,
      },
    ],
  },
]);

export default AppRouter;
