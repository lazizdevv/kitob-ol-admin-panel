import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useUpdatelanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updatedData }) =>
      gatewayRequest
        .put(`/languages/update?id=${id}`, updatedData)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Til muvaffaqiyatli yangilandi:", res);
      queryClient.invalidateQueries("getlanguagesList");
    },
    onError: (error) => {
      console.error("Til yangilashda xato:", error);
    },
  });
};
