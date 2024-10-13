import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => request.get("/auth/profile").then((res) => res.data),
    onError: (error) => {
      console.error("Profilni olishda xato:", error);  // Xato bo'lgan holat
    },
  });
};
