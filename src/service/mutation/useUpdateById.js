import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";
import { request } from "../../config/request";

export const useUpdateById = ( endpoint, queryKey, useGateway = true ) => {
  const queryClient = useQueryClient();
  const requestFunction = useGateway ? gatewayRequest : request;

  return useMutation({
    mutationFn: ({ id, ...updatedData }) =>
      requestFunction
        .put(`${endpoint}?id=${id}`, updatedData)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log(`${queryKey} muvaffaqiyatli yangilandi:`, res);
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      console.error(`${queryKey} yangilashda xato:`, error);
    },
  });
};
