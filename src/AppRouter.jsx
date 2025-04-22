import { createBrowserRouter } from "react-router";
import AdminPanel from "./admin-panel/AdminPanel";
import EmpPanel from "./employee-panel/EmpPanel";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import LoginForm from "./login-form/LoginForm";
import LandingPage from "./landing-page/LandingPage";
import RedirectIfAuthenticated from "./shared/components/RedirectIfAuthenticated";

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
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={["Employee"]}>
        <EmpPanel />
      </ProtectedRoute>
    ),
  },
]);

export default AppRouter;
