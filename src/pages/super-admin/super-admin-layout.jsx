import React from "react";
import { Outlet } from "react-router-dom";
import { SuperAdminSideBar } from "./super-admin-sidebar";

export const SuperAdminLayout = () => {
  return (
    <div className="super-admin-layout flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <SuperAdminSideBar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};
