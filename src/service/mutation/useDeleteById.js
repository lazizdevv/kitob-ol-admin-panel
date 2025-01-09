import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";
import { request } from "../../config/request"

export const useDeleteById = (endpoint, queryKey, useGateway = true) => {
  const queryClient = useQueryClient();

  const requestInstance = useGateway ? gatewayRequest : request;

  return useMutation({
    mutationFn: (id) =>
      requestInstance.delete(`${endpoint}?id=${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      console.error("xato:", error);
    },
  });
};
