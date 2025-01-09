import {
  Form,
  Input,
  Button,
  Typography,
  Segmented,
  message,
  Flex,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../service/mutation/useCreate";
import { adminEndPoints } from "../../config/endpoints";

export const SendSmsCode = () => {
  const [method, setMethod] = useState("email");
  const [form] = Form.useForm();
  const { mutate: sendByEmail, isPending: emailLoading } = useCreate(
    adminEndPoints.sms.email,
    "",
    false
  );
  const { mutate: sendByPhone, isPending: phoneLoading } = useCreate(
    adminEndPoints.sms.phone,
    "",
    false
  );
  const isLoading = emailLoading || phoneLoading;
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const sendSms = method === "email" ? sendByEmail : sendByPhone;
    const requestData =
      method === "email" ? { email: values.email } : { phone: values.phone };

    sendSms(requestData, {
      onSuccess: () => {
        message.success("SMS muvaffaqiyatli jo’natildi!");
        navigate(
          method === "email"
            ? "/reset-password-by-email"
            : "/reset-password-by-phone"
        );
      },
      onError: (error) => {
        console.error("Xato:", error);
        const errorMessage =
          error.response?.data?.message || "Jo'natishda xatolik yuz berdi!";

        message.error(errorMessage);
      },
    });
  };

  return (
    <Flex justify="center" align="center" className="h-screen bg-dark p-3">
      <Flex
        vertical
        className="bg-accent p-5 md:p-8 rounded-md max-w-md w-full"
      >
        <Typography.Title
          level={5}
          className="text-center mb-5 text-base text-gray-800"
        >
          Parolni tiklash uchun SMS kod jo’natish
        </Typography.Title>

        <Form.Item className="text-center mb-6">
          <Segmented
            options={[
              {
                label: "Email orqali",
                value: "email",
                className:
                  method === "email"
                    ? "text-white p-1 mr-2 w-full border-2 border-dark"
                    : "bg-gray-200 p-1 mr-2 w-full",
              },
              {
                label: "Telefon orqali",
                value: "phone",
                className:
                  method === "phone"
                    ? "text-white p-1 ml-2 w-full border-2 border-dark"
                    : "bg-gray-200 p-1 ml-2 w-full",
              },
            ]}
            value={method}
            onChange={(value) => setMethod(value)}
            className="w-full gap-5 space-x-5 bg-transparent"
          />
        </Form.Item>

        <Form form={form} onFinish={onSubmit} layout="vertical">
          {method === "email" ? (
            <Form.Item
              name="email"
              label="Emailingizni kiriting"
              rules={[{ required: true, message: "Email kiritilishi shart" }]}
            >
              <Input
                type="email"
                placeholder="example@gmail.com"
                size="large"
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="phone"
              label="Telefon raqamingiz"
              rules={[
                { required: true, message: "Telefon raqami kiritilishi shart" },
              ]}
            >
              <Input type="text" placeholder="+998901234567" size="large" />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Jo’natilmoqda..." : "SMS jo’natish"}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};
