import { useState } from "react";
import axios from "axios";

export const useUploadFile = () => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (selectedFile) => {
    if (!selectedFile) {
      console.error("Hech qanday fayl tanlanmadi.");
      return null;
    }

    const fileData = new FormData();
    fileData.append("file", selectedFile);

    try {
      setUploading(true); // Yuklashni boshlash holatini belgilash
      const response = await axios.post(
        "https://gateway.axadjonovsardorbek.uz/img-upload",
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Yuklangan rasm javobi:", response.data);

      // Serverdan qaytayotgan URL to'g'ri formatdaligini tekshirish
      if (response.data && response.data.Url) {
        setUploading(false); // Yuklash tugadi
        return response.data.Url; // Rasm URL qaytariladi
      } else {
        throw new Error("Rasm URL mavjud emas");
      }
    } catch (error) {
      setUploading(false); // Yuklash xato bilan tugadi
      console.error("Rasm yuklashda xato:", error);
      throw error;
    }
  };

  return { uploading, uploadFile };
};
