import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useResetPasswordByEmail = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await request.post(
        "/auth/admin/password/reset/email",
        data
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Email orqali parolni tiklashda xato:", error);
    },
  });
};

export const useResetPasswordByPhone = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await request.post(
        "/auth/admin/password/reset/phone",
        data
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Telefon orqali parolni tiklashda xato:", error);
    },
  });
};
