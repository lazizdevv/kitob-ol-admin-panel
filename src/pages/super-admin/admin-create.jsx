import React, { useState } from "react";
import { useAdminCreate } from "../../service/mutation/useAdminCreate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Button, Typography } from "antd";

export const AdminCreate = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { mutate, isLoading, isError, error } = useAdminCreate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Admin muvaffaqiyatli yaratildi!");
        setFormData({ email: "", password: "" });
      },
      onError: () => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="p-6 mt-5 shadow-primary max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2"
          />
        </Form.Item>

        <Form.Item
          label="Parol"
          validateStatus={isError && error.message ? "error" : ""}
        >
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            className="p-5 mt-5"
          >
            {isLoading ? "Creating..." : "Admin Yaratish"}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};
