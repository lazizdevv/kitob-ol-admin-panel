import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetPublishersList = (
  name = "",
  type = "",
  status = "",
  limit = 10,
  offset = 0
) => {
  return useQuery({
    queryKey: ["getPublishersList", name, type, status, limit, offset],
    queryFn: async () => {
      const response = await gatewayRequest.get(
        `/publishers/list?name=${name}&type=${type}&status=${status}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    },
    onSuccess: (publishers) => {
      console.log("Publishers list:", publishers);
    },
    onError: (error) => {
      console.error("Error fetching publishers:", error);
    },
  });
};
