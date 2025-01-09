import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetList = (endpoint, params = {}, useGateway = true) => {
  const apiRequest = useGateway ? gatewayRequest : request;

  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const response = await apiRequest.get(endpoint, { params });
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });
};
