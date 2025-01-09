import React from "react";
import { Form, Input, Button, notification, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../service/mutation/useCreate";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const CreateTranslatorForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreate(
    tarnslatorsEndPoints.create,
    tarnslatorsEndPoints.list
  );

  const onFinish = async (values) => {
    mutate(values, {
      onSuccess: () => {
        notification.success({
          message: "Tarjimon qo'shildi",
        });
        navigate("/admin/translator");
      },
    });
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="space-y-6 p-6 bg-accent shadow-md shadow-dark rounded-lg max-w-4xl mx-auto text-center w-full"
    >
      <Typography.Title level={3}>Tarjimon Yaratish</Typography.Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Ism"
          name="name"
          rules={[{ required: true, message: "to'ldirilishi shart" }]}
        >
          <Input size="large" placeholder="Ismni kiriting" />
        </Form.Item>

        <Form.Item
          label="Familiya"
          name="surname"
          rules={[{ required: true, message: "to'ldirilishi shart" }]}
        >
          <Input size="large" placeholder="Familiyani kiriting" />
        </Form.Item>
      </div>

      <Form.Item className="text-center">
        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="max-w-md"
        >
          {isPending ? "Yaratilmoqda..." : "Tarjimon yaratish"}
        </Button>
      </Form.Item>
    </Form>
  );
};
