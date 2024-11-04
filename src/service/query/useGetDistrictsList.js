import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetDistrictsList = (
  name = "",
  city_id = "",
  limit = 10,
  offset = 0
) => {
  return useQuery({
    queryKey: ["getDistrictsList", name, limit, offset],
    queryFn: async () => {
      const response = await gatewayRequest.get(
        `/districts/list?name=${name}&city_id=${city_id}&limit=${limit}&offset=${offset}`
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
