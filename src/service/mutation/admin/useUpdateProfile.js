import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (updatedData) =>
      request.put("/auth/user/update", updatedData).then((res) => res.data),
    onSuccess: (res) => {
      console.log("Profil muvaffaqiyatli yangilandi:", res);
    },
    onError: (error) => {
      console.error("Profilni yangilashda xato:", error);
    },
  });
};
