import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message, Flex, Typography } from "antd";
import { Loading } from "../../components/loading/loading";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetById } from "../../service/query/useGetById";
import { useUpdateById } from "../../service/mutation/useUpdateById";
import { languagesEndPoints } from "../../config/endpoints";

export const EditLanguages = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetById(languagesEndPoints.get, id);
  const { mutate, isPending } = useUpdateById(
    languagesEndPoints.update,
    languagesEndPoints.list
  );
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: {
          uz: data?.uz,
          en: data?.en,
          ru: data?.ru,
        },
      });
    }
  }, [data, form]);

  const onFinish = async (values) => {
    mutate(
      { id, ...values },
      {
        onSuccess: () => {
          navigate(-1);
          message.success("Til yangilandi!");
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex vertical justify="center" align="center" gap={24}>
      <Flex className="w-full">
        <Link to={"/admin/languages"}>
          <Button icon={<ArrowLeftOutlined />} type="primary">
            ortga
          </Button>
        </Link>
      </Flex>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="max-w-5xl w-full  p-6 bg-accent shadow-dark shadow-md border rounded-lg mt-6 text-center"
      >
        <Typography.Title level={3}>Tilni Tahrirlash</Typography.Title>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
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

        <Flex justify="center" className="w-full text-center">
          <Button
            block
            className="max-w-md"
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
