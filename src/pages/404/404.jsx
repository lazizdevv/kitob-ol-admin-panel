import React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";

export const NotFoundPage = () => {
  const user = loadState("user");
  const userRole = user?.role;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark p-4">
      <h1 className="text-8xl font-extrabold text-white mb-4 drop-shadow-lg">
        404
      </h1>
      <p className="text-2xl font-semibold text-white mb-8">Sahifa topilmadi</p>
      <p className="text-lg text-white mb-8 text-center">
        Siz qidirayotgan sahifa mavjud emas.
      </p>

      <Link
        to={
          userRole === "admin"
            ? "/admin/categories"
            : userRole === "superadmin"
            ? "/admin/admin-create"
            : "/"
        }
        className="text-dark text-lg hover:bg-blue-500 transition-all py-2 px-4 bg-primary rounded-md"
      >
        {userRole === "admin"
          ? "Admin Paneliga Qaytish"
          : userRole === "superadmin"
          ? "Super Admin Paneliga Qaytish"
          : "Kirish Sahifasiga Qaytish"}
      </Link>
    </div>
  );
};
