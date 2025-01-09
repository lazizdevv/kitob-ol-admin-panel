import { useMutation } from "@tanstack/react-query";
import { gatewayRequest } from "../../../config/geteway-request"; // Asosiy request konfiguratsiyasi uchun
import { useState } from "react";

export const useUploadFile = () => {
  const [uploading, setUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (selectedFile) => {
      if (!selectedFile) {
        throw new Error("Hech qanday fayl tanlanmadi.");
      }

      const fileData = new FormData();
      fileData.append("file", selectedFile);

      // Faylni yuklash uchun POST so'rovi
      const response = await gatewayRequest.post("/img-upload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.Url) {
        return response.data.Url; // Serverdan qaytgan URL
      } else {
        throw new Error("Rasm URL mavjud emas.");
      }
    },
    onMutate: () => {
      setUploading(true); // Yuklashni boshlash holati
    },
    onSuccess: () => {
      setUploading(false); // Yuklash muvaffaqiyatli tugadi
    },
    onError: (error) => {
      setUploading(false); // Xato holati
      console.error("Rasm yuklashda xato:", error);
    },
  });

  return { uploading, uploadFile: mutation.mutateAsync };
};
