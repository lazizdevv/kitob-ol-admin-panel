import {
  Form,
  Button,
  notification,
  Flex,
  Typography,
  Input,
  Statistic,
} from "antd";
import { useResetPasswordByEmail } from "./useResetPassword";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const { Title } = Typography;
const { Countdown } = Statistic;

export const ResetPasswordByEmail = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useResetPasswordByEmail();
  const [deadline, setDeadline] = useState(Date.now() + 3 * 60 * 1000);

  const onFinish = (values) => {
    console.log(values);

    mutate(values, {
      onSuccess: () => {
        notification.success({ message: "Parol muvaffaqiyatli tiklandi!" });
        navigate("/");
      },
      onError: (error) => {
        console.error("Xato:", error);

        const errorMessage =
          error.response?.data?.message || "Xatolik: Parolni tiklashda muammo!";
        notification.error({ message: errorMessage });
      },
    });
  };

  return (
    <Flex align="center" justify="center" className="bg-accent h-screen p-5">
      <Form
        name="resetPasswordEmail"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-md bg-white w-full p-8 rounded-md shadow-lg shadow-dark"
      >
        <Typography.Title
          level={4}
          className="text-center mb-5 text-base text-gray-800"
        >
          Parolni tasdiqlash
        </Typography.Title>
        <Form.Item
          className="text-center"
          name="confirmationCode"
          label="Tasdiqlash kodi"
          rules={[
            { required: true, message: "Tasdiqlash kodi kiritilishi shart!" },
          ]}
        >
          <Input.OTP
            size="large"
            formatter={(str) => str.toUpperCase()}
            length={6}
            onChange={(text) => console.log("Tasdiqlash kodi:", text)}
          />
        </Form.Item>

        <Flex className="my-5" justify="space-between" align="center">
          <Countdown
            value={deadline}
            onFinish={() =>
              notification.warning({
                message: "Tasdiqlash kodi eskirdi, kodni qayta yuboring!",
              })
            }
            format="mm:ss"
            className="text-red-500"
          />
          <Link to={"/forgot-password"}>
            <Button type="link">Kodni qayta yuborish</Button>
          </Link>
        </Flex>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email kiritilishi shart!" }]}
        >
          <Input size="large" placeholder="Emailingizni kiriting" />
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
          loading={isPending}
        >
          Parolni tiklash
        </Button>
      </Form>
    </Flex>
  );
};
