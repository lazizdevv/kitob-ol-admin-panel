import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message, Flex, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetById } from "../../service/query/useGetById";
import { useUpdateById } from "../../service/mutation/useUpdateById";
import { categoriesEndPoints } from "../../config/endpoints";

export const EditCategory = () => {
  const { id } = useParams();
  const { data: category, isLoading } = useGetById(categoriesEndPoints.get, id);
  const { mutate, isPending } = useUpdateById(
    categoriesEndPoints.update,
    categoriesEndPoints.list
  );
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [category, form]);

  const onFinish = async (data) => {
    mutate(
      { id, ...data },
      {
        onSuccess: () => {
          navigate(`/admin/categories`);
          message.success("Kategoriya yangilandi!");
        },
        onError: () => {
          message.error("Kategoriya yangilanmadi...");
        },
      }
    );
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Flex vertical gap={24}>
      <Flex>
        <Link to={`/admin/categories`}>
          <Button icon={<ArrowLeftOutlined />} type="primary">
            ortga
          </Button>
        </Link>
      </Flex>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6 w-full max-w-5xl mx-auto p-6 bg-accent shadow-dark shadow-md border border-gray-200 rounded-lg"
      >
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Kategoriyani Tahrirlash
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            label="Nom (O'zbek):"
            name={["name", "uz"]}
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Nom (Ingliz):"
            name={["name", "en"]}
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Nom (Rus):"
            name={["name", "ru"]}
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" />
          </Form.Item>
        </div>

        <Form.Item
          label="Tavsif (O'zbek):"
          name={["description", "uz"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tavsif (Ingliz):"
          name={["description", "en"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tavsif (Rus):"
          name={["description", "ru"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Flex>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="w-full max-w-lg mx-auto"
          >
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};
