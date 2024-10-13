import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useAdminDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      request.delete(`/auth/admin/delete?id=${id}`).then((res) => res.data),
    onSuccess: (res) => {
      console.log("Admin muvaffaqiyatli o'chirildi:", res);
      // Adminlar ro'yxatini yangilash
      queryClient.invalidateQueries("adminList");
    },
    onError: (error) => {
      console.error("Adminni o'chirishda xato:", error);
    },
  });
};
