import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useSendSmsCodeByEmail = () => {
  return useMutation({
    mutationFn: async (email) => {
      const response = await request.post(
        "/auth/sms/password/forgot/email",
        email
      );
      return response.data;
    },
  });
};

export const useSendSmsCodeByPhone = () => {
  return useMutation({
    mutationFn: async (phone) => {
      const response = await request.post(
        "/auth/sms/password/forgot/phone",
        phone
      );
      return response.data;
    },
  });
};
