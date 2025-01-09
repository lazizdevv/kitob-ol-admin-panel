import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loadState } from "../../config/stroge";
import { message } from "antd";

export const ProtectedRoute = ({ allowedRoles }) => {
  const user = loadState("user");
  const userRole = user?.role;

  if (!userRole) {
    message.error("Kirish Uchun Login Qiling!");
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    message.info(
      `Kirish Uchun ${allowedRoles.join(", ")} Roli Talab Qilinadi!`
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
