import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetDistrictsById = (id) => {
  return useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () =>
      gatewayRequest.get(`/districts/get?id=${id}`).then((res) => res.data),
    enabled: !!id,
    onSuccess: (category) => {
      console.log("tuman topildi:", category);
    },
    onError: (error) => {
      console.error("tumanni olishda xatolik yuz berdi:", error);
    },
  });
};
