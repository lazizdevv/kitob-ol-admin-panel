import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (credentials) =>
      request
        .put("/auth/admin/password/change", credentials)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Parol muvaffaqiyatli o‘zgartirildi:", res);
    },
    onError: (error) => {
      console.error("Parolni o‘zgartirishda xato:", error);
    },
  });
};
