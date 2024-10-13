import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../service/query/useGetProfile";
import { useUpdateProfile } from "../../service/mutation/useUpdateProfile";
import axios from "axios"; // Axios kutubxonasidan foydalanamiz
import { EditProfileCard } from "../../components/edit-profile-card/edit-profile-card";
import { toast } from "react-toastify";

export const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetProfile();

  const updateProfile = useUpdateProfile();
  const { mutate } = useUpdateProfile();

  // Form ma'lumotlarini boshida bo'sh qilib olamiz
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    image_url: "", // Boshqa joyga URL saqlash
  });
  console.log();

  const [selectedFile, setSelectedFile] = useState(null); // Yuklangan faylni saqlash
  const [uploading, setUploading] = useState(false); // Fayl yuklanayotganligini kuzatish

  // Profil ma'lumotlari yuklanganda formData ni to'ldirish
  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        date_of_birth: data.date_of_birth || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        image_url: data.image_url || "", // Eskirgan profil rasmini ko'rsatish
      });
    }
  }, [data]);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Faylni holatda saqlash
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      console.error("Hech qanday fayl tanlanmadi.");
      return;
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
        // 'Url' maydonini tekshirish
        setUploading(false);
        return response.data.Url; // Rasm URL qaytariladi
      } else {
        throw new Error("Rasm URL mavjud emas");
      }
    } catch (error) {
      setUploading(false);
      console.error("Rasm yuklashda xato:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      // Agar fayl yuklangan bo'lsa, uni yuklash va URL ni olish
      if (selectedFile) {
        imageUrl = await uploadFile();
      }

      // FormData ga URL ni qo'shamiz
      const updatedFormData = {
        ...formData,
        image_url: imageUrl, // Yuklangan URL'ni qo'shish
      };

      await updateProfile.mutateAsync(updatedFormData, {
        onSuccess: () => {
          toast.success("profile o'zgartirildi!");
        },
      }); // FormData bilan jo'natish
      navigate(-1);
    } catch (error) {
      console.error("Yangilanishda xato:", error);
    }
  };

  return (
    <>
      <EditProfileCard
        formData={formData}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        uploading={uploading}
      />
    </>
  );
};
