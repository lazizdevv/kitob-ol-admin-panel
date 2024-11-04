import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useCreateDistrict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newDistrict) => {
      return gatewayRequest.post("/districts/create", newDistrict);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDistrictsList"]);
      console.log("Tuman muvaffaqiyatli yaratildi");
    },
    onError: (error) => {
      console.error("Tuman yaratishda xatolik:", error);
    },
  });
};
