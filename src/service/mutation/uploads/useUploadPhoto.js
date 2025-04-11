import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { gatewayRequest } from "../../../config/geteway-request";

export const useUploadPhotos = () => {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file); // ✅ Hook o‘zi formData yaratadi

      const response = await gatewayRequest.post("/img-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // ✅ Faqat URL qaytaramiz
    },
    onSuccess: (url) => {
      message.success("Rasm muvaffaqiyatli yuklandi!");
      console.log("Yuklangan rasm URL:", url);
    },
    onError: (error) => {
      message.error(`Rasm yuklashda xato: ${error.message}`);
    },
  });
};
