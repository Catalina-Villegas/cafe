import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Verificar rol desde el token
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (adminOnly && payload.rol !== "admin") {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Token inválido:", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
