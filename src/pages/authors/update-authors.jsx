import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { Form, Input, Button, Flex, Typography, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetById } from "../../service/query/useGetById";
import { useUpdateById } from "../../service/mutation/useUpdateById";
import { authorsEndPoints } from "../../config/endpoints";

export const EditAuthors = () => {
  const { id } = useParams();
  const { data: author, isLoading } = useGetById(authorsEndPoints.get, id);
  const { mutate, isPending } = useUpdateById(
    authorsEndPoints.update,
    authorsEndPoints.list
  );
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (author) {
      form.setFieldsValue(author);
    }
  }, [author, form]);

  const onFinish = (values) => {
    mutate(
      { id, ...values },
      {
        onSuccess: () => {
          navigate("/admin/authors");
          message.success("Muallif yangilandi");
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex vertical gap={24}>
      <Flex>
        <Link to={`/admin/authors`}>
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            ortga
          </Button>
        </Link>
      </Flex>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="p-6 bg-accent shadow-md shadow-dark rounded-lg max-w-4xl w-full mx-auto text-center"
      >
        <Typography.Title level={2}>Muallifni Tahrirlash</Typography.Title>
        <Flex
          justify="space-between"
          className="flex-wrap md:flex-nowrap gap-0 md:gap-5"
        >
          <Form.Item
            className="w-full"
            label="Ism"
            name="name"
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" placeholder="Ismni kiriting" />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Familiya"
            name="surname"
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" placeholder="Familiyani kiriting" />
          </Form.Item>
        </Flex>

        <Form.Item
          label="Biografiya"
          name="biography"
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea rows={4} placeholder="Biografiyani kiriting" />
        </Form.Item>

        <Flex className="text-center">
          <Button
            block
            className="max-w-md mx-auto"
            size="large"
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};
