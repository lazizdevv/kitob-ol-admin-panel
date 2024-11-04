import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetCitiesList = (name = "", limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ["getCitiesList", name, limit, offset],
    queryFn: async () => {
      const response = await gatewayRequest.get(
        `/cities/list?name=${name}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    },
    onSuccess: (categories) => {
      console.log("Categories list:", categories);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });
};
