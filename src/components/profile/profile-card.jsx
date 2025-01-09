import React, { useState } from "react";
import { Avatar, Button, Typography, Modal, Flex } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { LogoIcon } from "../../assets/LogoIcon";

const { Text, Title } = Typography;

export const formatPhoneNumber = (phone) => {
  if (!phone) return "Ma'lumot yo'q";
  return phone.replace(
    /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
    "$1 $2-$3-$4-$5"
  );
};

export const ProfileCard = ({
  date_of_birth,
  email,
  first_name,
  last_name,
  phone_number,
  image_url,
  role,
}) => {
  const [copyMessage, setCopyMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyPhoneNumber = () => {
    navigator.clipboard
      .writeText(phone_number)
      .then(() => {
        setCopyMessage(`${phone_number}`);
        setTimeout(() => setCopyMessage(), 1000);
      })
      .catch(() => {
        setCopyMessage("Nusxalashda xatolik yuz berdi.");
      });
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex
      vertical
      className="max-w-sm md:max-w-lg w-full mx-auto lg:max-w-2xl p-3 md:p-5 shadow-md shadow-dark rounded-md"
    >
      <Flex vertical justify="center" align="center" className="mb-6">
        {image_url ? (
          <Avatar
            src={image_url}
            size={128}
            onClick={handleImageClick}
            className="border-4 border-dark cursor-zoom-in"
          />
        ) : (
          <Flex
            justify="center"
            align="center"
            className=" bg-primary border-4 border-dark  w-32 h-32 rounded-full"
          >
            <LogoIcon />
          </Flex>
        )}
        <Title level={2} className="text-center text-xl md:text-2xl">
          {first_name || "nomalum"} {last_name || "nomalum"}
        </Title>
      </Flex>

      <Flex vertical gap={12}>
        <Flex align="center" gap={12} className="border p-3 rounded-md">
          <Text strong>Roli:</Text>
          <Text className="text-gray-700">{role}</Text>
        </Flex>
        <Flex
          align="center"
          gap={12}
          wrap
          className="border p-3 rounded-md relative"
        >
          <Text strong>Tel:</Text>
          <Flex align="center" justify="space-between" gap={12}>
            <Text className="text-gray-700">
              {formatPhoneNumber(phone_number)}
            </Text>
          </Flex>
          <Button
            onClick={handleCopyPhoneNumber}
            type={copyMessage ? "primary" : "default"}
            className="absolute top-1 right-1 "
          >
            {copyMessage ? <CheckOutlined /> : <CopyOutlined />}
          </Button>
        </Flex>

        <Flex align="center" gap={12} wrap className="border p-3 rounded-md">
          <Text strong>Email:</Text>
          <Text className="text-gray-700">{email || "Ma'lumot yo'q"}</Text>
        </Flex>

        <Flex align="center" gap={12} className="border p-3 rounded-md">
          <Text strong>Tug'ilgan sana:</Text>
          <Text className="text-gray-700">
            {date_of_birth || "Ma'lumot yo'q"}
          </Text>
        </Flex>
      </Flex>

      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        closeIcon={
          <Button icon={<CloseOutlined />} className="text-white bg-red-500" />
        }
      >
        <img src={image_url} alt="Profile" className="w-full object-cover" />
      </Modal>
    </Flex>
  );
};
