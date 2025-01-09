import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useCreate } from "../../service/mutation/useCreate";
import { usersEndPoints } from "../../config/endpoints";

export const AdminCreate = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { mutate, isLoading, isError, error } = useCreate(
    usersEndPoints.create,
    usersEndPoints.list,
    false
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        message.success("Admin muvaffaqiyatli yaratildi!");
        setFormData({ email: "", password: "" });
      },
      onError: () => {
        message.error(error.message);
      },
    });
  };

  return (
    <div className="p-6 mt-5 shadow-dark max-w-lg mx-auto bg-accent rounded-xl shadow-md space-y-6">
      <Typography.Title level={2} className="text-center">
        Yangi Admin Yaratish
      </Typography.Title>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Email"
          validateStatus={isError && error.message ? "error" : ""}
          help={isError && error.message ? error.message : null}
        >
          <Input
            prefix={<UserOutlined />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            size="large"
            placeholder="exsample@gmail.com"
          />
        </Form.Item>

        <Form.Item
          label="Parol"
          validateStatus={isError && error.message ? "error" : ""}
        >
          <Input.Password
            prefix={<LockOutlined />}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            size="large"
            placeholder="****"
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
            {isLoading ? "Creating..." : "Admin Yaratish"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
