import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../config/request";
import { gatewayRequest } from "../../config/geteway-request";

export const useCreate = (endpoint, queryKey, useGateway = true) => {
  const queryClient = useQueryClient();
  const selectedRequest = useGateway ? gatewayRequest : request;

  return useMutation({
    mutationFn: (data) =>
      selectedRequest.post(endpoint, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      console.error("Yaratishda xato yuz berdi:", error);
    },
  });
};
