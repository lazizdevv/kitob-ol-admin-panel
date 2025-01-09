import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetById = (endpoint, id, useGateway = true) => {
  const selectedRequest = useGateway ? gatewayRequest : request;

  return useQuery({
    queryKey: [endpoint, id],
    queryFn: async () => {
      const response = await selectedRequest.get(`${endpoint}?id=${id}`);
      return response.data;
    },
    enabled: !!id,
    onError: (error) => {
      console.error(`Error fetching data from ${endpoint}:`, error);
    },
  });
};
