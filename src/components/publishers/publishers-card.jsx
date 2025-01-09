import React, { useState } from "react";
import { Button, Tooltip, Switch, message, Modal, Flex, Dropdown } from "antd";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useChangeStatus } from "../../service/mutation/publishers/useChangePublisherStatus";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { publishersEndPoints } from "../../config/endpoints";

export const PublisherCard = ({ publisher }) => {
  const [status, setStatus] = useState(publisher.status === "true");
  const { mutate, isPending: changeLoading } = useChangeStatus();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    mutate: deltePublisher,
    error: deleteError,
    isPending,
  } = useDeleteById(
    publishersEndPoints.delete,
    publishersEndPoints.list,
    false
  );

  const handleStatusChange = (checked) => {
    setStatus(checked);
    mutate(
      { id: publisher.id, status: checked },
      {
        onSuccess: () => {
          message.success("Status muvaffaqiyatli o'zgartirildi!");
        },
        onError: () => {
          message.error("Xatolik yuz berdi, qayta urinib ko'ring!");
          setStatus(!checked);
        },
      }
    );
  };

  const handleDelete = () => {
    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    deltePublisher(publisher.id, {
      onSuccess: () => {
        message.success("Nashriyot muvaffaqiyatli o'chirildi!");
        setConfirmVisible(false);
      },
      onError: () => {
        message.error(deleteError?.message);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <Flex justify="center">
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "status",
              label: (
                <Tooltip title="status o'zgartirish">
                  <Switch
                    checked={status}
                    onChange={handleStatusChange}
                    loading={changeLoading}
                  />
                </Tooltip>
              ),
            },
            {
              key: "view",
              label: (
                <Link
                  className="w-full"
                  to={`/admin/publishers-detail/${publisher.id}`}
                >
                  <Button
                    block
                    children="Batafsil"
                    size="small"
                    className="border-blue-500"
                    icon={<InfoCircleOutlined />}
                    type="link"
                  />
                </Link>
              ),
            },
            {
              key: "delete",
              label: (
                <Button
                  danger
                  children="O'chirish"
                  size="small"
                  type="primary"
                  loading={isPending}
                  onClick={handleDelete}
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
        title="O'chirishni tasdiqlang"
        open={confirmVisible}
        onOk={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
      >
        <p>Nashriyotchini o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </Flex>
  );
};
