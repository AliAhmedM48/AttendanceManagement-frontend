import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
const getInitialAuth = () => {
  const storedAuth = localStorage.getItem("auth");
  return storedAuth
    ? JSON.parse(storedAuth)
    : {
        isAuthenticated: false,
        role: null,
        fullName: null,
        token: null,
        id: null,
      };
};
export const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(getInitialAuth);
  const [isInitialized, setIsInitialized] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const storedAuth = getInitialAuth();
    setAuthState(storedAuth);
    setIsInitialized(true);
  }, []);

  const setAuth = (authData) => {
    setAuthState(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const login = (data) => {
    try {
      let decoded;
      if (data.token) {
        decoded = jwtDecode(data.token);
      }

      console.log("Decoded token:", decoded);
      console.log(" Data:", data);

      const authData = {
        isAuthenticated: true,
        role: data.role || decoded?.role || null,
        token: data.token,
        fullName: data.fullName || "null",
        id: data.id || decoded?.id || null,
      };

      setAuth(authData);
    } catch (error) {
      console.error("Error decoding token", error);
    }
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      role: null,
      fullName: null,
      token: null,
      id: null,
    });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, isLoading, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
};
