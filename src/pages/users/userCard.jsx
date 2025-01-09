import React, { useState } from "react";
import { Button, Tooltip, Modal, Flex, message, Dropdown } from "antd";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { usersEndPoints } from "../../config/endpoints";

export const UserCard = ({ user }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    mutate,
    error: deleteError,
    isPending,
  } = useDeleteById(usersEndPoints.delete, usersEndPoints.list, false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    mutate(user.id, {
      onSuccess: () => {
        message.success("Foydalanuvchi muvaffaqiyatli o'chirildi!");
        setConfirmVisible(false);
      },
      onError: () => {
        message.error(deleteError?.message);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <>
      <Flex align="center" justify="center" gap={12}>
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <Button
                    block
                    children="Batafsil"
                    size="small"
                    icon={<InfoCircleOutlined />}
                    type="link"
                    onClick={() => navigate(`/admin/detail-page/${user.id}`)}
                    className="border-blue-500"
                  />
                ),
              },
              {
                key: "view",
                label: (
                  <Button
                    danger
                    children="O'chirish"
                    type="primary"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    loading={isPending}
                  />
                ),
              },
            ],
          }}
        >
          <Button size="small" icon={<MoreOutlined />} />
        </Dropdown>

        <Modal
          title="O'chirishni tasdiqlang"
          open={confirmVisible}
          onOk={confirmDelete}
          onCancel={() => setConfirmVisible(false)}
          okText="O'chirish"
          cancelText="Bekor qilish"
        >
          <p>Foydalanuvchini o'chirishni tasdiqlaysizmi?</p>
        </Modal>
      </Flex>
    </>
  );
};
