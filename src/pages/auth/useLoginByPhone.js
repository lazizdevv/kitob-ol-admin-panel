import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useLoginByPhone = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/auth/admin/login/phone", data).then((res) => res.data),
    onSuccess: (res) => {
      console.log(res);
    },
  });
};
