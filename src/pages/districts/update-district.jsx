import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { useGetById } from "../../service/query/useGetById";
import { useUpdateById } from "../../service/mutation/useUpdateById";
import { districtsEndPoints } from "../../config/endpoints";

export const UpdateDistrict = () => {
  const { id } = useParams();
  const { data: district, isLoading } = useGetById(districtsEndPoints.get, id);
  const { mutate, isPending } = useUpdateById(
    districtsEndPoints.update,
    districtsEndPoints.list
  );
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (district) {
      form.setFieldsValue({
        uz: district?.name?.uz,
        en: district?.name?.en,
        ru: district?.name?.ru,
      });
    }
  }, [district, form]);

  const onFinish = (values) => {
    const updatedDistrict = {
      city_id: district?.city_id,
      name: {
        uz: values.uz,
        en: values.en,
        ru: values.ru,
      },
    };

    mutate(
      { id, ...updatedDistrict },
      {
        onSuccess: () => {
          navigate(-1);
          message.success("Tuman muvaffaqiyatli yangilandi!");
        },
        onError: (error) => {
          message.error("Xatolik yuz berdi");
          console.error("Tumanni yangilashda xatolik:", error);
        },
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <Form
      className="border-2 max-w-screen-sm mx-auto p-5 shadow-md shadow-primary rounded-md"
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Tuman nomi (UZ)"
        name="uz"
        rules={[{ required: true, message: "Iltimos, tuman nomini kiriting!" }]}
      >
        <Input placeholder="Tuman nomi (UZ)" />
      </Form.Item>

      <Form.Item
        label="Tuman nomi (EN)"
        name="en"
        rules={[{ required: true, message: "Iltimos, tuman nomini kiriting!" }]}
      >
        <Input placeholder="Tuman nomi (EN)" />
      </Form.Item>

      <Form.Item
        label="Tuman nomi (RU)"
        name="ru"
        rules={[{ required: true, message: "Iltimos, tuman nomini kiriting!" }]}
      >
        <Input placeholder="Tuman nomi (RU)" />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isPending}
          className="w-full p-5"
          type="primary"
          htmlType="submit"
        >
          Yangilash
        </Button>
      </Form.Item>
    </Form>
  );
};
