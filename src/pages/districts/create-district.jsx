import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateDistrict } from "../../service/mutation/useCreateDistricts";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";

export const CreateDistrict = () => {
  const { id } = useParams();
  const { mutate: createDistrict, isLoading } = useCreateDistrict();
  const { data: citie } = useGetCitiesById(id);

  const navigate = useNavigate();

  const onFinish = (values) => {
    const newDistrict = {
      city_id: id,
      name: {
        uz: values.uz,
        en: values.en,
        ru: values.ru,
      },
    };

    createDistrict(newDistrict, {
      onSuccess: () => {
        notification.success({ message: "Tuman muvaffaqiyatli yaratildi!" });
        navigate(-1);
      },
      onError: (error) => {
        notification.error({
          message: "Xatolik yuz berdi",
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-center text-dark font-bold text-xl">
        {citie?.name?.uz} Shahari uchun tuman yarating
      </h2>
      <Form
        className="border-2 p-5 shadow-md shadow-primary rounded-md w-full max-w-screen-sm mx-auto"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="District Name (Uzbek)"
          name="uz"
          rules={[
            { required: true, message: "Please enter district name in Uzbek" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="District Name (English)"
          name="en"
          rules={[
            {
              required: true,
              message: "Please enter district name in English",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="District Name (Russian)"
          name="ru"
          rules={[
            {
              required: true,
              message: "Please enter district name in Russian",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full p-5"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Tuman Yaratish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
