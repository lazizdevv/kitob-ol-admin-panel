import React from "react";
import { Form, Input, Button, Typography, Flex, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../service/mutation/useCreate";
import { categoriesEndPoints } from "../../config/endpoints";

const { Title } = Typography;

export const CreateCategoryForm = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useCreate(
    categoriesEndPoints.create,
    categoriesEndPoints.list
  );
  const navigate = useNavigate();

  const onFinish = async (values) => {
    mutate(values, {
      onSuccess: () => {
        navigate(`/admin/categories`);
        notification.success({
          message: "Muvaffaqiyat",
          description: "Kategoriya yaratildi!",
        });
      },
      onError: () => {
        notification.error({
          message: "Xatolik",
          description: "Kategoriya yaratilmadi...",
        });
      },
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="space-y-6 p-6 bg-accent shadow-md shadow-dark rounded-lg w-full max-w-screen-lg mx-auto"
    >
      <Title level={3} className="text-center">
        Kategoriya Yaratish
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item
          label="Nom (O'zbek)"
          name={["name", "uz"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="Kategoriya nomini kiriting" />
        </Form.Item>

        <Form.Item
          label="Nom (Ingliz)"
          name={["name", "en"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="Category name" />
        </Form.Item>

        <Form.Item
          label="Nom (Rus)"
          name={["name", "ru"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="Название категории" />
        </Form.Item>
      </div>

      <Flex vertical>
        <Form.Item
          label="Tavsif (O'zbek)"
          name={["description", "uz"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea placeholder="Kategoriya tavsifi" rows={4} />
        </Form.Item>

        <Form.Item
          label="Tavsif (Ingliz)"
          name={["description", "en"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea placeholder="Category description" rows={4} />
        </Form.Item>

        <Form.Item
          label="Tavsif (Rus)"
          name={["description", "ru"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea placeholder="Описание категории" rows={4} />
        </Form.Item>
      </Flex>

      <Form.Item className="text-center">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="max-w-lg w-full"
        >
          {isPending ? "Yaratyapti..." : "Kategoriya Yaratish"}
        </Button>
      </Form.Item>
    </Form>
  );
};
