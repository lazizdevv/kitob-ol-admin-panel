import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useCreate } from "../../service/mutation/useCreate";
import { useGetById } from "../../service/query/useGetById";
import { citiesEndPoints, districtsEndPoints } from "../../config/endpoints";

export const CreateDistrict = () => {
  const { id } = useParams();
  const { mutate: createDistrict, isLoading } = useCreate(
    districtsEndPoints.create,
    districtsEndPoints.list
  );
  const { data: citie } = useGetById(citiesEndPoints.get, id);

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
        message.success("Tuman muvaffaqiyatli yaratildi!");
        navigate(-1);
      },
      onError: () => {
        message.error("Xatolik yuz berdi");
      },
    });
  };

  return (
    <Form
      className="border-2 p-5 shadow-md shadow-dark bg-accent rounded-md w-full max-w-screen-sm mx-auto"
      layout="vertical"
      onFinish={onFinish}
    >
      <Typography.Title level={4} className="text-center">
        {citie?.name?.uz} Shahari uchun tuman yarating
      </Typography.Title>
      <Form.Item
        label="District Name (Uzbek)"
        name="uz"
        rules={[
          { required: true, message: "Please enter district name in Uzbek" },
        ]}
      >
        <Input size="large" />
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
        <Input size="large" />
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
        <Input size="large" />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Tuman Yaratish
        </Button>
      </Form.Item>
    </Form>
  );
};
