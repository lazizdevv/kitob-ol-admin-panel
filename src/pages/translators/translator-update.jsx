import React, { useEffect } from "react";
import { Form, Input, Button, message, Spin, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateById } from "../../service/mutation/useUpdateById";
import { useGetById } from "../../service/query/useGetById";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const TranslatorUpdate = () => {
  const { id: translatorId } = useParams();
  const { data: translator, isLoading } = useGetById(
    tarnslatorsEndPoints.get,
    translatorId
  );
  const { mutate, isPending } = useUpdateById(
    tarnslatorsEndPoints.update,
    tarnslatorsEndPoints.list
  );

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (translator) {
      form.setFieldsValue({
        name: translator?.name,
        surname: translator?.surname,
      });
    }
  }, [translator, form]);

  const onFinish = (values) => {
    mutate(
      { id: translatorId, ...values },
      {
        onSuccess: () => {
          navigate("/admin/translator");
          message.success("Tarjimon muvaffaqiyatli yangilandi!");
        },
        onError: (error) => {
          message.error(`Tarjimonni yangilab bo‘lmadi: ${error.message}`);
        },
      }
    );
  };

  if (isLoading) {
    return <Spin size="default" />;
  }

  return (
    <div className="translator-update max-w-5xl mx-auto p-6 bg-white shadow-primary shadow-md border border-gray-200 rounded-lg mt-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        Tarjimonni yangilash
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6"
      >
        <Flex
          gap={12}
          className="flex-wrap md:flex-nowrap"
          justify="space-between"
        >
          <Form.Item
            className="w-full"
            label="Ism"
            name="name"
            rules={[{ required: true, message: "Iltimos, ismni kiriting!" }]}
          >
            <Input size="large" placeholder="ism" />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Familiya"
            name="surname"
            rules={[
              { required: true, message: "Iltimos, familiyani kiriting!" },
            ]}
          >
            <Input size="large" placeholder="familiya" />
          </Form.Item>
        </Flex>

        <Form.Item className="w-full text-center">
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="max-w-lg"
            block
            size="large"
          >
            {isPending ? "Yangilanmoqda..." : "Yangilash"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
