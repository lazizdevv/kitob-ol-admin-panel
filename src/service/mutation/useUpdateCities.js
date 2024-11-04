import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useUpdateCities = () => {
  const queryClient = useQueryClient(); // Query clientni yaratish

  return useMutation({
    mutationFn: ({ id, ...updatedData }) =>
      gatewayRequest
        .put(`/cities/update?id=${id}`, updatedData)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Shahar muvaffaqiyatli yangilandi:", res);
      queryClient.invalidateQueries("getCitiesList");
    },
    onError: (error) => {
      console.error("Shahar yangilashda xato:", error);
    },
  });
};
