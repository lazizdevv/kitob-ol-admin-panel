import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetCitiesById = (id) => {
  return useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () =>
      gatewayRequest.get(`/cities/get?id=${id}`).then((res) => res.data),
    enabled: !!id,
    onSuccess: (category) => {
      console.log("Kategoriya topildi:", category);
    },
    onError: (error) => {
      console.error("Kategoriyani olishda xatolik yuz berdi:", error);
    },
  });
};
