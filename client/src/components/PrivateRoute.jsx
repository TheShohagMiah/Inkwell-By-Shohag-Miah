import React from "react";
import { Navigate } from "react-router-dom";
const useAuth = () => {
  // DEBUG MODE: Remove this once your Login page actually sets the user
  // localStorage.setItem("user", JSON.stringify({ role: "admin", name: "Admin" }));

  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return { isAuthenticated: false, role: "user" };

    const user = JSON.parse(rawUser);

    // Ensure we are returning exactly what PrivateRoute expects
    return {
      isAuthenticated: !!user,
      role: user?.role || "user",
    };
  } catch (error) {
    // If it's a raw string (token), we treat it as authenticated but guest
    return { isAuthenticated: true, role: "user" };
  }
};
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    console.warn("Access_Denied: Requires Admin Role");
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PrivateRoute;
