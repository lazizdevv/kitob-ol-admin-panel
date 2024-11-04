import { useForm } from "react-hook-form";
import { useLogin } from "./uselogin";
import { useLoginByPhone } from "./useLoginByPhone";
import { Link, useNavigate } from "react-router-dom";
import { saveState } from "../../config/stroge";
import { toast } from "react-toastify";
import { Form, Input, Button, Typography, Segmented, Flex } from "antd";
import { useState } from "react";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loginMethod, setLoginMethod] = useState("email");
  const { mutate: loginByEmail, isLoading: loadingEmail } = useLogin();
  const { mutate: loginByPhone, isLoading: loadingPhone } = useLoginByPhone();
  const isLoading = loadingEmail || loadingPhone;

  const navigate = useNavigate();

  const submit = (data) => {
    console.log(data);

    const mutate = loginMethod === "email" ? loginByEmail : loginByPhone;
    mutate(data, {
      onSuccess: (res) => {
        saveState("user", {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          role: res.role,
        });

        if (res.role === "admin") {
          navigate("/admin");
          toast.success("Kirish muvaffaqiyatli", { autoClose: 3000 });
        } else if (res.role === "superadmin") {
          navigate("/super-admin");
          toast.success("Kirish muvaffaqiyatli", { autoClose: 3000 });
        } else {
          navigate("/");
        }
      },
      onError: () => {
        toast.error("Login yoki parol noto'g'ri", { position: "top-center" });
        toast.error("Maydonlarni tekshiring!", { position: "top-center" });
      },
    });
  };

  return (
    <Flex align="center" justify="center" className="bg-accent h-screen p-5">
      <Flex
        className="max-w-md bg-white w-full p-5 md:p-8 rounded-md shadow-lg shadow-dark"
        vertical
        align="center"
        justify="center"
      >
        <Typography.Title level={2} className="text-center text-gray-800 mb-6">
          Kirish
        </Typography.Title>

        <Form.Item className="w-full">
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
            className="w-full bg-transparent"
          />
        </Form.Item>

        <Form
          className="text-center w-full"
          onFinish={handleSubmit(submit)}
          layout="vertical"
        >
          {loginMethod === "email" ? (
            <Form.Item
              label="Email"
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
              label="Telefon raqami"
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

          <Form.Item
            label="Parol"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password ? errors.password.message : null}
          >
            <Input.Password
              {...register("password", { required: "Parol kiritilishi shart" })}
              placeholder="********"
              onChange={(e) => setValue("password", e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              disabled={isLoading}
              size="large"
            >
              {isLoading ? "Kirish..." : "Kirish"}
            </Button>
          </Form.Item>
          <Link to={"/forgot-password"}>
            <Typography.Link>parolni unutdingizmi?</Typography.Link>{" "}
          </Link>
        </Form>
      </Flex>
    </Flex>
  );
};
