import React, { useState, useEffect } from "react";
import { useGetProfile } from "../../service/query/useGetProfile";
import { useUpdateProfile } from "../../service/mutation/useUpdateProfile";
import { toast } from "react-toastify";
import { useUploadFile } from "../../service/mutation/useUploadFile";
import { PhoneNumberInput } from "../phone-number-card/phone-number-card";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Input, Button, Upload, Avatar, Tooltip, Flex } from "antd";
import { Loading } from "../loading/loading";
import { EditFilled } from "@ant-design/icons";

export const EditProfileCard = () => {
  const { data, isLoading, isError, error } = useGetProfile();
  const { mutate, isPending } = useUpdateProfile();
  const { uploading, uploadFile } = useUploadFile();
  const { register, handleSubmit, setValue } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
      setValue("date_of_birth", data.date_of_birth);
      setValue("phone_number", data.phone_number);
      setValue("email", data.email);
      setValue("image_url", data.image_url);
    }
  }, [data, setValue]);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    return false;
  };

  const onSubmit = async (formData) => {
    let imageUrl = formData.image_url;

    if (selectedFile) {
      imageUrl = await uploadFile(selectedFile);
    }

    const updatedFormData = {
      ...formData,
      image_url: imageUrl,
    };

    mutate(updatedFormData, {
      onSuccess: () => {
        toast.success("Profil o'zgartirildi!");
        navigate(-1);
      },
      onError: (error) => {
        toast.error("Yangilanishda xato: " + error.message);
      },
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  return (
    <Flex justify="center" align="center">
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className="space-y-4 max-w-2xl w-full bg-white p-5 md:p-8 shadow-lg shadow-dark rounded-md"
      >
        <Flex
          justify="center"
          align="center"
          className="relative w-fit mx-auto"
        >
          <Avatar
            src={previewImage || data?.image_url}
            alt="Profil rasmi"
            size={112}
            className="border-4 border-dark shadow-lg"
          />
          <Upload
            beforeUpload={handleFileChange}
            showUploadList={false}
            className="absolute bottom-0 right-0"
          >
            <Tooltip placement="right" title="Profil rasmni o'zgartirish">
              <Button
                icon={<EditFilled />}
                shape="circle"
                className="bg-dark text-white shadow-md"
                size="middle"
              />
            </Tooltip>
          </Upload>
        </Flex>

        <Form.Item label="Ism:">
          <Input
            {...register("first_name", { required: true })}
            onChange={(e) => setValue("first_name", e.target.value)}
            defaultValue={data?.first_name}
            size="large"
          />
        </Form.Item>

        <Form.Item label="Familiya:">
          <Input
            {...register("last_name", { required: true })}
            onChange={(e) => setValue("last_name", e.target.value)}
            defaultValue={data?.last_name}
            size="large"
          />
        </Form.Item>

        <Form.Item label="Tug'ilgan sana:">
          <input
            type="date"
            {...register("date_of_birth", { required: true })}
            onChange={(e) => setValue("date_of_birth", e.target.value)}
            defaultValue={data?.date_of_birth}
            className="border  p-2 rounded-md w-full"
          />
        </Form.Item>

        <PhoneNumberInput
          value={data?.phone_number}
          onChange={(newValue) => setValue("phone_number", newValue)}
        />

        <Form.Item label="Email:">
          <Input
            type="email"
            {...register("email", { required: true })}
            onChange={(e) => setValue("email", e.target.value)}
            defaultValue={data?.email}
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {isPending ? "Saqlanmoqda" : "Saqlash"}
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
