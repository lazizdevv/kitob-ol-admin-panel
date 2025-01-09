import React, { useState } from "react";
import { Button, Typography, Modal, Flex, message, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { languagesEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const LanguagesCard = ({ category }) => {
  const { mutate, isPending } = useDeleteById(
    languagesEndPoints.delete,
    languagesEndPoints.list
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    mutate(category.id, {
      onSuccess: () => {
        message.success(`${category.name.uz || "Til"} Tili o'chirildi`);
        setIsModalVisible(false);
      },
      onError: () => {
        message.error(`Tilni o'chirishda xato yuz berdi!`);
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Flex justify="center">
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items: [
            {
              key: "edit",
              label: (
                <Link to={`/admin/languages-update/${category.id}`}>
                  <Button
                    children="Tahrirlash"
                    type="primary"
                    icon={<EditOutlined />}
                  />
                </Link>
              ),
            },
            {
              key: "delete",
              label: (
                <Button
                  danger
                  block
                  children="O'chirish"
                  type="primary"
                  loading={isPending}
                  onClick={showDeleteConfirm}
                  disabled={isPending}
                  icon={<DeleteOutlined />}
                />
              ),
            },
          ],
        }}
      >
        <Button size="small" icon={<MoreOutlined />} />
      </Dropdown>

      <Modal
        title="O'chirishni tasdiqlash"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isPending }}
      >
        <Text>{`${category.name.uz} Tili o'chirilsinmi?`}</Text>
      </Modal>
    </Flex>
  );
};
