import React, { useState, useEffect } from "react";
import { useUpdateProfile } from "../../service/mutation/admin/useUpdateProfile";
import { useUploadFile } from "../../service/mutation/uploads/useUploadFile";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Tooltip,
  Flex,
  DatePicker,
  message,
} from "antd";
import { Loading } from "../loading/loading";
import { EditFilled } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import moment from "moment";
import { adminEndPoints } from "../../config/endpoints";

export const EditProfileCard = () => {
  const { data, isLoading, isError, error } = useGetList(
    adminEndPoints.profile,
    {},
    false
  );
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { uploadFile } = useUploadFile();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [firstName, setFirstName] = useState(data?.first_name || "");
  const [lastName, setLastName] = useState(data?.last_name || "");
  const [dateOfBirth, setDateOfBirth] = useState(data?.date_of_birth || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phone_number || "");
  const [email, setEmail] = useState(data?.email || "");

  useEffect(() => {
    if (data) {
      setSelectedFile(data?.image_url);
    }
  }, [data]);

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

  const onDateChange = (date, dateString) => {
    setDateOfBirth(dateString);
  };

  const onSubmit = async (values) => {
    try {
      let imageUrl = selectedFile;

      if (selectedFile && typeof selectedFile !== "string") {
        message.loading("Rasm yuklanmoqda...");
        imageUrl = await uploadFile(selectedFile);
        message.success("Rasm muvaffaqiyatli yuklandi!");
      }

      const updatedFormData = {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        phone_number: phoneNumber,
        email: email,
        image_url: imageUrl,
      };

      updateProfile(updatedFormData, {
        onSuccess: () => {
          message.success("Profil o'zgartirildi!");
          navigate("/admin/profile");
        },
        onError: (error) => {
          message.error("Yangilanishda xato: " + error.message);
        },
      });
    } catch (error) {
      message.error("Rasm yuklashda xato: " + error.message);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  return (
    <Flex justify="center" align="center">
      <Form
        onFinish={onSubmit}
        layout="vertical"
        className="space-y-4 max-w-2xl w-full bg-accent p-5 md:p-8 shadow-lg shadow-dark rounded-md"
        initialValues={{
          first_name: data?.first_name,
          last_name: data?.last_name,
          date_of_birth: data?.date_of_birth
            ? moment(data.date_of_birth)
            : null,
          phone_number: data?.phone_number,
          email: data?.email,
        }}
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

        <Flex
          justify="space-between"
          gap={12}
          className="flex-wrap md:flex-nowrap"
        >
          <Form.Item label="Ism:" className="w-full" name="first_name">
            <Input
              value={firstName}
              size="large"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Familiya:" className="w-full" name="last_name">
            <Input
              value={lastName}
              size="large"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
        </Flex>

        <Flex justify="space-between" gap={12}>
          <Form.Item
            label="Tug'ilgan sana:"
            className="w-full"
            name="date_of_birth"
          >
            <DatePicker
              size="large"
              format="YYYY-MM-DD"
              value={dateOfBirth ? moment(dateOfBirth) : null}
              onChange={onDateChange}
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Telefon raqam:"
            className="w-full"
            name="phone_number"
          >
            <Input
              value={phoneNumber}
              size="large"
              maxLength={13}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>
        </Flex>

        <Form.Item label="Email:" name="email">
          <Input
            type="email"
            value={email}
            size="large"
            onChange={(e) => setEmail(e.target.value)}
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
