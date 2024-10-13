import React from "react";
import { Link } from "react-router-dom";

export const AdminSideBar = () => {
  return (
    <div className="h-full p-6 bg-gray-800 text-white shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">Admin Sidebar</h1>

      <div className="space-y-4">
        <Link
          to="/admin/profile"
          className="block px-4 py-2 rounded-md text-lg font-medium bg-gray-700 hover:bg-gray-600 transition duration-200"
        >
          Profile
        </Link>
      </div>
    </div>
  );
};
