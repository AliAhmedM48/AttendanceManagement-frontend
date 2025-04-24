import { RouterProvider } from "react-router";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { ScreenSizeProvider } from "./shared/contexts/ScreenSizeContext";
import { useAuthValidation } from "./shared/hooks/useAuthValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef, useEffect } from "react";

function AppContent() {
  const { isInvalidToken, logout } = useAuthValidation();
  const hasHandledInvalidToken = useRef(false); // فلاغ لمنع التكرار

  useEffect(() => {
    if (isInvalidToken && !hasHandledInvalidToken.current) {
      hasHandledInvalidToken.current = true; // أول مرة فقط

      toast.error("Session expired. Logging out...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        logout();
      }, 2000);
    }
  }, [isInvalidToken, logout]);

  return (
    <>
      <RouterProvider router={AppRouter} />
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ScreenSizeProvider>
        <AppContent />
      </ScreenSizeProvider>
    </AuthProvider>
  );
}

export default App;
