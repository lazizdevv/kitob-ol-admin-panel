import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => request.post("/auth/admin/login/email", data).then((res) => res.data),
    onSuccess: (res) => {
      console.log(res);
    },
  });
};