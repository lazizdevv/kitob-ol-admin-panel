import { Form, Input, Button, Flex, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../service/mutation/useCreate";
import { adminEndPoints } from "../../config/endpoints";

export const ResetPasswordByPhone = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreate(
    adminEndPoints.reset.phone,
    "",
    false
  );

  const onFinish = (values) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/");
        message.success("Parol muvaffaqiyatli tiklandi!");
      },
      onError: () => {
        message.error("Xatolik: Parolni tiklashda muammo!");
      },
    });
  };

  return (
    <Flex justify="center" align="center" className="bg-dark h-screen p-3">
      <Form
        className="max-w-md border-2 p-5 md:p-8 w-full bg-accent rounded-md"
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
