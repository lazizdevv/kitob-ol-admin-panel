import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useUpdateDistrict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updatedData }) =>
      gatewayRequest
        .put(`/districts/update?id=${id}`, updatedData)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Tuman muvaffaqiyatli yangilandi:", res);
      queryClient.invalidateQueries("getDistrictsList"); // Yangilangan tumanni qayta yuklash
    },
    onError: (error) => {
      console.error("Tuman yangilashda xato:", error);
    },
  });
};
