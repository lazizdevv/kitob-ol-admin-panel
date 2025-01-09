import React, { useState } from "react";
import {
  Button,
  Tooltip,
  Typography,
  Modal,
  Flex,
  message,
  Dropdown,
} from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { districtsEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const DistrictsCard = ({ category }) => {
  const { mutate: deleteDistricts, isPending } = useDeleteById(
    districtsEndPoints.delete,
    districtsEndPoints.list
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    deleteDistricts(category.id, {
      onSuccess: () => {
        message.success(`${category.name.uz || "tuman"} o'chirildi`);
        setIsModalVisible(false);
      },
      onError: () => {
        message.error(`Tuman o'chirishda xato yuz berdi!`);
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateLink = `/admin/update-district/${category.id}`;

  return (
    <Flex justify="center">
      <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: (
                <Link to={updateLink}>
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
                  children="O'chirish"
                  danger
                  block
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
        <Text>{`${category.name.uz} tumani` || "tuman"} o'chirilsinmi?</Text>
      </Modal>
    </Flex>
  );
};
