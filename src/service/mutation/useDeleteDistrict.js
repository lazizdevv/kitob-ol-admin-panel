import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useDeleteDistricts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      gatewayRequest.delete(`/districts/delete?id=${id}`).then((res) => res.data), // URLni yangilash
    onSuccess: (res) => {
      console.log("Tuman muvaffaqiyatli o'chirildi:", res);
      // Kategoriyalar ro'yxatini yangilash
      queryClient.invalidateQueries("getDistrictsList"); // Kategoriyalar ro'yxatini yangilash
    },
    onError: (error) => {
      console.error("Tuman o'chirishda xato:", error);
    },
  });
};
