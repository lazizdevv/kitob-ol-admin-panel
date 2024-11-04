import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useCreateLanguages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory) => {
      return gatewayRequest.post("/languages/create", newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getLanguagesList"]);
      console.log("Til muvaffaqiyatli yaratildi");
    },
    onError: (error) => {
      console.error("Til yaratishda xatolik:", error);
    },
  });
};
