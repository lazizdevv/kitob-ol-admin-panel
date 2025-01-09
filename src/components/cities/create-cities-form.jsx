import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../service/mutation/useCreate";
import { citiesEndPoints } from "../../config/endpoints";

export const CreateCitiesForm = () => {
  const { mutate, isPending } = useCreate(
    citiesEndPoints.create,
    citiesEndPoints.list
  );
  const navigate = useNavigate();

  const onFinish = async (values) => {
    mutate(values, {
      onSuccess: () => {
        message.success("Shahar muvaffaqiyatli yaratildi!");
        navigate("/admin/cities");
      },
      onError: (error) => {
        message.error(
          `Xato: ${error.message || "Shahar yaratishda muammo yuz berdi."}`
        );
      },
    });
  };

  return (
    <Form
      onFinish={onFinish}
      className="p-6 bg-accent shadow-md shadow-dark rounded-lg max-w-4xl w-full"
      layout="vertical"
    >
      <Typography.Title
        level={3}
        className="text-2xl font-bold text-center mb-6"
      >
        Shahar Yaratish
      </Typography.Title>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <Form.Item
          label="Nom (O'zbek)"
          name={["name", "uz"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="nom" />
        </Form.Item>

        <Form.Item
          label="Nom (Ingliz)"
          name={["name", "en"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="name" />
        </Form.Item>

        <Form.Item
          label="Nom (Rus)"
          name={["name", "ru"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="Название" />
        </Form.Item>
      </div>

      <Form.Item className="text-center">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="max-w-lg w-full"
        >
          {isPending ? "Yaratyapti..." : "Shahar Yaratish"}
        </Button>
      </Form.Item>
    </Form>
  );
};
