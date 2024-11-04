import { Form, Input, Button, notification, Flex, Typography } from "antd";
import { useResetPasswordByPhone } from "./useResetPassword";
import { useNavigate } from "react-router-dom";

export const ResetPasswordByPhone = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useResetPasswordByPhone();

  const onFinish = (values) => {
    console.log(values);

    mutate(values, {
      onSuccess: () => {
        notification.success({ message: "Parol muvaffaqiyatli tiklandi!" });
        navigate("/");
      },
      onError: () => {
        notification.error({ message: "Xatolik: Parolni tiklashda muammo!" });
      },
    });
  };

  return (
    <Flex justify="center" align="center" className="bg-accent h-screen p-5">
      <Form
        className="max-w-md border-2 p-5 md:p-8 w-full bg-white rounded-md shadow-lg shadow-dark"
        name="resetPasswordPhone"
        onFinish={onFinish}
        layout="vertical"
      >
        <Typography.Title
          level={4}
          className="text-center mb-5 text-base text-gray-800"
        >
          Parolni tasdiqlash
        </Typography.Title>
        <Form.Item
          name="confirmationCode"
          label="Tasdiqlash kodi"
          rules={[
            { required: true, message: "Tasdiqlash kodi kiritilishi shart!" },
          ]}
        >
          <Input.OTP
            length={6}
            size="large"
            placeholder="Tasdiqlash kodini kiriting"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon raqami"
          rules={[
            { required: true, message: "Telefon raqami kiritilishi shart!" },
          ]}
        >
          <Input size="large" placeholder="Telefon raqamingizni kiriting" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Yangi parol"
          rules={[
            { required: true, message: "Yangi parol kiritilishi shart!" },
          ]}
        >
          <Input.Password size="large" placeholder="Yangi parolni kiriting" />
        </Form.Item>

        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Parolni tiklash
        </Button>
      </Form>
    </Flex>
  );
};
