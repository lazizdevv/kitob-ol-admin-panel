import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient(); // Query clientni yaratish

  return useMutation({
    mutationFn: ({ id, ...updatedData }) =>
      gatewayRequest.put(`/categories/update?id=${id}`, updatedData).then((res) => res.data),
    onSuccess: (res) => {
      console.log("Kategoriyani muvaffaqiyatli yangilandi:", res);
      // Kategoriyalar ro'yxatini yangilash
      queryClient.invalidateQueries("categoryList");
    },
    onError: (error) => {
      console.error("Kategoriyani yangilashda xato:", error);
    },
  });
};
