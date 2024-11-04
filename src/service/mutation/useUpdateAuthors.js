import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useUpdateAuthors = () => {
  const queryClient = useQueryClient(); // Query clientni yaratish

  return useMutation({
    mutationFn: ({ id, ...updatedData }) =>
      gatewayRequest.put(`/authors/update?id=${id}`, updatedData).then((res) => res.data),
    onSuccess: (res) => {
      console.log("Muallif muvaffaqiyatli yangilandi:", res);
      // Mualliflar ro'yxatini yangilash
      queryClient.invalidateQueries("authorsList"); // Ensure this matches your query key for authors
    },
    onError: (error) => {
      console.error("Muallifni yangilashda xato:", error);
    },
  });
};
