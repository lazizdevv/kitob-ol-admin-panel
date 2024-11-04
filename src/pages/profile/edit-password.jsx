import React from "react";
import { Form, Input, Button, Flex, Typography } from "antd";
import { useChangePassword } from "../../service/mutation/useUpdatePassword";
import { Link, useNavigate } from "react-router-dom";
import { loadState } from "../../config/stroge";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const ChangePassword = () => {
  const { mutate, isLoading, isError, isPending } = useChangePassword();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const user = loadState("user");

  const backLink =
    user.role === "superadmin" ? "/super-admin/profile" : "/admin/profile";

  const handleChangePassword = (values) => {
    const { oldPassword, newPassword } = values;
    mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          navigate(backLink);
          toast.success("parol yangilandi");
        },
        onError: () => {
          toast.error("eski parolingiz xato");
        },
      }
    );
  };

  return (
    <>
      <Flex
        className="h-full flex-wrap-reverse md:flex-nowrap"
        justify="center"
        align="center"
        vertical
        gap={24}
      >
        <Form
          className="bg-white w-full max-w-md p-5 md:p-8 rounded-md shadow-dark shadow-md"
          form={form}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Typography.Title level={3}>Parolni O‘zgartirish</Typography.Title>
          <Form.Item
            label="Eski Parol"
            name="oldPassword"
            rules={[{ required: true, message: "Eski parolni kiriting" }]}
          >
            <Input.Password
              className={isError && "border-red-500"}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Yangi Parol"
            name="newPassword"
            rules={[{ required: true, message: "Yangi parolni kiriting" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item className="my-10 mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              size="large"
            >
              {isLoading ? "O‘zgartirilmoqda..." : "O‘zgartirish"}
            </Button>
          </Form.Item>
        </Form>

        <Link className="md:hidden" to={backLink}>
          <Button size="large" type="primary" icon={<ArrowLeftOutlined />}>
            Ortga
          </Button>
        </Link>
      </Flex>
    </>
  );
};
