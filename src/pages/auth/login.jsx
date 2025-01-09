import { Link, useNavigate } from "react-router-dom";
import { saveState } from "../../config/stroge";
import {
  Form,
  Input,
  Button,
  Typography,
  Segmented,
  Flex,
  message,
} from "antd";
import { useState } from "react";
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useCreate } from "../../service/mutation/useCreate";
import { adminEndPoints } from "../../config/endpoints";

export const Login = () => {
  const [form] = Form.useForm();
  const [loginMethod, setLoginMethod] = useState("email");
  const { mutate: loginByEmail, isPending: loadingEmail } = useCreate(
    adminEndPoints.login.email,
    "",
    false
  );
  const { mutate: loginByPhone, isPending: loadingPhone } = useCreate(
    adminEndPoints.login.phone,
    "",
    false
  );
  const isLoading = loadingEmail || loadingPhone;

  const navigate = useNavigate();

  const submit = (data) => {
    const mutate = loginMethod === "email" ? loginByEmail : loginByPhone;
    mutate(data, {
      onSuccess: (res) => {
        saveState("user", {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          role: res.role,
        });

        if (res.role === "admin") {
          navigate("/admin/categories");
          message.success("Kirish muvaffaqiyatli");
        } else if (res.role === "superadmin") {
          navigate("/admin/admin-create");
          message.success("Kirish muvaffaqiyatli");
        } else {
          navigate("/");
        }
      },
      onError: () => {
        message.error("Xatolik Maydonlarni tekshiring!");
      },
    });
  };

  return (
    <Flex align="center" justify="center" className="bg-dark h-screen p-3">
      <Flex
        className="max-w-lg bg-accent w-full p-5 md:p-8 rounded-md"
        vertical
        align="center"
        justify="center"
      >
        <Typography.Title level={2} className="text-center text-gray-800 mb-6">
          Kirish
        </Typography.Title>

        <Segmented
          options={[
            {
              label: "Email orqali",
              value: "email",
              className:
                loginMethod === "email"
                  ? "text-white p-1 mr-2 w-full border-2 border-dark"
                  : "bg-gray-200 p-1 mr-2 w-full",
            },
            {
              label: "Telefon orqali",
              value: "phone",
              className:
                loginMethod === "phone"
                  ? "text-white p-1 ml-2 w-full border-2 border-dark"
                  : "bg-gray-200 p-1 ml-2 w-full",
            },
          ]}
          value={loginMethod}
          onChange={(value) => setLoginMethod(value)}
          className="w-full bg-transparent mb-6"
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={submit}
          className="text-center w-full"
        >
          {loginMethod === "email" ? (
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email kiritilishi shart" }]}
            >
              <Input
                type="email"
                placeholder="example@gmail.com"
                size="large"
                prefix={<UserOutlined />}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="phone"
              label="Telefon raqami"
              rules={[
                { required: true, message: "Telefon raqami kiritilishi shart" },
              ]}
            >
              <Input
                type="text"
                placeholder="+998901234567"
                size="large"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>
          )}

          <Form.Item
            name="password"
            label="Parol"
            rules={[{ required: true, message: "Parol kiritilishi shart" }]}
          >
            <Input.Password
              placeholder="********"
              size="large"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              size="large"
            >
              {isLoading ? "Kirmoqda..." : "Kirish"}
            </Button>
          </Form.Item>
        </Form>

        <Link to={"/forgot-password"} className="text-blue-500 underline">
          Parolni unutdingizmi?
        </Link>
      </Flex>
    </Flex>
  );
};
