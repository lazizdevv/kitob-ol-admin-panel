import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminSideBar } from "./admin-sidebar";

export const AdminLayout = () => {
  const role = "admin";

  if (role == "admin") {
    return (
      <div className="super-admin-layout flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <AdminSideBar />
      </div>
      
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
    );
  }
  return <Navigate to="/" />;
};
