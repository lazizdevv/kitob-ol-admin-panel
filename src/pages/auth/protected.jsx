import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { loadState } from "../../config/stroge";

export const ProtectedRoute = ({ allowedRoles }) => {
  const user = loadState("user"); // localStorage-dan foydalanuvchi ma'lumotini olish
  const userRole = user?.role;

  if (!userRole) {
    // Agar foydalanuvchi login qilmagan bo'lsa
    toast.error("Kirish Uchun Login Qiling!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Agar foydalanuvchi ruxsat berilmagan marshrutga kirishga harakat qilsa
    toast.error(
      `Bu Sahifaga Kirish Uchun ${allowedRoles.join(
        ", "
      )} Roli Talab Qilinadi!`,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      }
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Agar ro'l mos kelsa, marshrutlarni ochadi
};

