import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useDeletePublisher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      request
        .delete(`/auth/admin/publisher/delete?id=${id}`)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Publisher muvaffaqiyatli o'chirildi:", res);
      queryClient.invalidateQueries("getPublishersList");
    },
    onError: (error) => {
      console.error("Publisher o'chirishda xato:", error);
    },
  });
};
