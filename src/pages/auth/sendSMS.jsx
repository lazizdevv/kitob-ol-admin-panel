import { useForm } from "react-hook-form";
import { Form, Input, Button, Typography, Segmented, Flex } from "antd";
import { useState } from "react";
import { useSendSmsCodeByEmail, useSendSmsCodeByPhone } from "./useSendSMS";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SendSmsCode = () => {
  const [method, setMethod] = useState("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { mutate: sendByEmail, isPending: emailLoading } =
    useSendSmsCodeByEmail();
  const { mutate: sendByPhone, isPending: phoneLoading } =
    useSendSmsCodeByPhone();
  const isLoading = emailLoading || phoneLoading;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const sendSms = method === "email" ? sendByEmail : sendByPhone;
    const requestData =
      method === "email" ? { email: data.email } : { phone: data.phone };

    console.log(requestData);

    sendSms(requestData, {
      onSuccess: () => {
        toast.success("SMS muvaffaqiyatli jo’natildi!", { autoClose: 3000 });
        console.log(requestData);

        navigate(
          method === "email"
            ? "/reset-password-by-email"
            : "/reset-password-by-phone"
        );
        console.log(`ssss ${requestData}`);
      },
      onError: (error) => {
        console.log(requestData);

        console.error("Xato:", error);
        const errorMessage =
          error.response?.data?.message || "Jo'natishda xatolik yuz berdi!";
        toast.error(errorMessage, { position: "top-center" });
      },
    });

    console.log(data);
  };

  return (
    <Flex align="center" justify="center" className="h-screen bg-accent p-5">
      <Flex
        vertical
        className="bg-white p-5 md:p-8 rounded-md shadow-lg shadow-dark max-w-md w-full"
      >
        <Typography.Title
          level={4}
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

        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          {method === "email" ? (
            <Form.Item
              label="Emailingizni kiriting"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email ? errors.email.message : null}
            >
              <Input
                {...register("email", { required: "Email kiritilishi shart" })}
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setValue("email", e.target.value)}
                size="large"
              />
            </Form.Item>
          ) : (
            <Form.Item
              label="Telefon raqamingiz"
              validateStatus={errors.phone ? "error" : ""}
              help={errors.phone ? errors.phone.message : null}
            >
              <Input
                {...register("phone", {
                  required: "Telefon raqami kiritilishi shart",
                })}
                type="text"
                placeholder="+998901234567"
                onChange={(e) => setValue("phone", e.target.value)}
                size="large"
              />
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
