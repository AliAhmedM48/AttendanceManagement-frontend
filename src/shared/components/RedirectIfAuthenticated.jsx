import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const RedirectIfAuthenticated = ({ children }) => {
  const { auth, isLoading } = useAuth();

  if (isLoading) return null;

  if (auth?.isAuthenticated) {
    return auth.role === "Admin" ? (
      <Navigate to="/admin-panel" replace />
    ) : (
      <Navigate to="/profile" replace />
    );
  }

  return children;
};

export default RedirectIfAuthenticated;
