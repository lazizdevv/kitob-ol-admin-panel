import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory) => {
      return gatewayRequest.post('/categories/create', newCategory);
    },
    onSuccess: () => {
      // Kategoriyalarni yangilash
      queryClient.invalidateQueries(["getCategories"]);
      console.log("Kategoriya muvaffaqiyatli yaratildi");
    },
    onError: (error) => {
      console.error("Kategoriya yaratishda xatolik:", error);
    },
  });
};
