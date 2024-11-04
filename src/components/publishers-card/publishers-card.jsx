import React, { useState } from "react";
import { Button, Tooltip, Switch, message, Modal } from "antd";
import {
  PhoneOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import { useChangeStatus } from "../../service/mutation/useChangePublisherStatus";
import { useDeletePublisher } from "../../service/mutation/useDeletePublisher";
import { toast } from "react-toastify";

export const PublisherCard = ({ publisher }) => {
  const role = loadState("user");
  const [status, setStatus] = useState(publisher.status === "true"); // String qiymatini Boolean ga aylantirish
  const { mutate, isLoading } = useChangeStatus();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    mutate: deltePublisher,
    error: deleteError,
    isPending,
  } = useDeletePublisher();

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/publishers-detail/${publisher.id}`
      : `/admin/publishers-detail/${publisher.id}`;

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
        toast.success("Nashriyot muvaffaqiyatli o'chirildi!");
        setConfirmVisible(false);
      },
      onError: () => {
        toast.error(deleteError?.message);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <div className="border-2 rounded-md">
      <div className="publisher-card w-full p-3 flex justify-between items-center flex-wrap gap-5">
        <div className="flex gap-5 items-center justify-center">
          <img
            alt={publisher.name}
            src={publisher.image_url}
            style={{ maxHeight: "200px", objectFit: "cover" }}
            className="w-20 rounded-md object-cover border-2"
          />
          <h2 className="max-w-40 w-full min-w-40">{publisher.name}</h2>
        </div>
        <p>
          <PhoneOutlined /> {publisher.phone_number}
        </p>

        <p className="border p-1 rounded border-primary font-medium">
          {publisher.type}
        </p>

        <div className="flex gap-5 w-full md:w-fit md:gap-16 justify-center items-center">
          <Tooltip title="status o'zgartirish">
            <div className="flex items-center gap-2">
              <Switch
                checked={status}
                onChange={handleStatusChange}
                loading={isLoading}
              />
            </div>
          </Tooltip>

          <Tooltip title="Batafsil ko'rish">
            <Link to={detailLink}>
              <Button
                className="bg-blue-500 text-white"
                icon={<InfoCircleOutlined />}
                type="primary"
              ></Button>
            </Link>
          </Tooltip>

          <Tooltip title="O'chirish">
            <Button
              type="default"
              loading={isPending}
              onClick={handleDelete}
              disabled={isPending}
              icon={<DeleteOutlined />}
              className="bg-red-500 text-white"
            />
          </Tooltip>
        </div>
      </div>

      <Modal
        title="O'chirishni tasdiqlang"
        visible={confirmVisible}
        onOk={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
      >
        <p>Nashriyotchini o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </div>
  );
};
