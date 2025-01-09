import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useChangeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => {
      return request.put(
        "/auth/admin/publisher/status/change",
        { id, status },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getPublishers"]);
      console.log("Status muvaffaqiyatli o'zgartirildi");
    },
    onError: (error) => {
      console.error("Statusni o'zgartirishda xatolik:", error);
    },
  });
};
