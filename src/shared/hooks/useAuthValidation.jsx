import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { validateToken } from "../services/authService";

export const useAuthValidation = () => {
  const { logout, auth, isInitialized } = useAuth();
  const [isInvalidToken, setIsInvalidToken] = useState(false);

  useEffect(() => {
    if (!isInitialized) return; // ننتظر التهيئة
    if (!auth.token) return; // لا يوجد توكن لنتحقق منه

    const checkToken = async () => {
      try {
        const result = await validateToken(auth.token);
        console.log("Token is valid", result);
      } catch (error) {
        console.warn("Token validation failed", error);
        setIsInvalidToken(true);
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [auth.token, isInitialized]);

  return { isInvalidToken, logout };
};
