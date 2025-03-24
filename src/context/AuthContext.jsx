import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Check if token exists in localStorage
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("token", "your-token"); // Simulate storing a token
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
