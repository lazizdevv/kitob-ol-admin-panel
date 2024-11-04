import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetLanguagesById = (id) => {
  return useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () =>
      gatewayRequest.get(`/languages/get?id=${id}`).then((res) => res.data),
    enabled: !!id,
    onSuccess: (category) => {
      console.log("Til topildi:", category);
    },
    onError: (error) => {
      console.error("Til olishda xatolik yuz berdi:", error);
    },
  });
};
