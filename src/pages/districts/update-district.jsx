import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetDistrictsById } from "../../service/query/useGetDistrictsById";
import { useUpdateDistrict } from "../../service/mutation/useUpdateDistrict";
import { Loading } from "../../components/loading/loading";

export const UpdateDistrict = () => {
  const { id } = useParams(); // URL'dan ID olamiz
  const { data: district, isLoading } = useGetDistrictsById(id); // Tumanni olish hook'i
  const updateDistrict = useUpdateDistrict(); // Tumanni yangilash hook'i
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (district) {
      // Tuman ma'lumotlarini formaga set qilish
      form.setFieldsValue({
        uz: district?.name?.uz,
        en: district?.name?.en,
        ru: district?.name?.ru,
      });
    }
  }, [district, form]);

  const onFinish = (values) => {
    const updatedDistrict = {
      city_id: district?.city_id, // city_id avvalgi qiymati bilan saqlanadi
      name: {
        uz: values.uz,
        en: values.en,
        ru: values.ru,
      },
    };

    console.log("Yuborilayotgan ma'lumot:", updatedDistrict);

    updateDistrict.mutate(
      { id, ...updatedDistrict },
      {
        onSuccess: () => {
          notification.success({ message: "Tuman muvaffaqiyatli yangilandi!" });
          navigate(-1); // Yangilangandan keyin qayta yo'naltirish
        },
        onError: (error) => {
          console.error("Tumanni yangilashda xatolik:", error);
          notification.error({
            message: "Xatolik yuz berdi",
            description: error.message,
          });
        },
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <Form
      className="border-2 max-w-screen-sm mx-auto p-5 shadow-md shadow-primary rounded-md"
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Tuman nomi (UZ)"
        name="uz"
        rules={[{ required: true, message: "Iltimos, tuman nomini kiriting!" }]}
      >
        <Input placeholder="Tuman nomi (UZ)" />
      </Form.Item>

      <Form.Item
        label="Tuman nomi (EN)"
        name="en"
        rules={[{ required: true, message: "Iltimos, tuman nomini kiriting!" }]}
      >
        <Input placeholder="Tuman nomi (EN)" />
      </Form.Item>

      <Form.Item
        label="Tuman nomi (RU)"
        name="ru"
        rules={[{ required: true, message: "Iltimos, tuman nomini kiriting!" }]}
      >
        <Input placeholder="Tuman nomi (RU)" />
      </Form.Item>

      <Form.Item>
        <Button className="w-full p-5" type="primary" htmlType="submit">
          Yangilash
        </Button>
      </Form.Item>
    </Form>
  );
};
