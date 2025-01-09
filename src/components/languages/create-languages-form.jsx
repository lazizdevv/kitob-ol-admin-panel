import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../service/mutation/useCreate";
import { languagesEndPoints } from "../../config/endpoints";

export const CreateLanguagesForm = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useCreate(
    languagesEndPoints.create,
    languagesEndPoints.list
  );
  const navigate = useNavigate();

  const onFinish = async (values) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/admin/languages");
        message.success("Til qo'shildi!");
      },
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="p-6 bg-accent shadow-md shadow-primary rounded-lg max-w-6xl w-full"
    >
      <Typography.Title
        level={3}
        className="text-2xl font-bold text-center mb-6"
      >
        Til Yaratish
      </Typography.Title>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item
          label="Nom (O'zbek)"
          name={["name", "uz"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="nomini kiriting" />
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

      <Form.Item className="text-center mb-0">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="max-w-lg w-full"
        >
          {isPending ? "Yaratyapti..." : "Yaratish"}
        </Button>
      </Form.Item>
    </Form>
  );
};
