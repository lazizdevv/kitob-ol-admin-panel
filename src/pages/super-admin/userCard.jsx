import React, { useState } from "react";
import { Button, Tag, Tooltip, Modal, Card } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminDelete } from "../../service/mutation/useAdminDelete";
import { toast } from "react-toastify";
import { LogoIcon } from "../../assets/LogoIcon";

export const UserCard = ({ user }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { mutate, error: deleteError, isPending } = useAdminDelete();
  const navigate = useNavigate();

  const handleDelete = () => {
    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    mutate(user.id, {
      onSuccess: () => {
        toast.success("Foydalanuvchi muvaffaqiyatli o'chirildi!");
        setConfirmVisible(false);
      },
      onError: () => {
        toast.error(deleteError?.message);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <div className="border border-dark p-3 rounded-md">
      <div className="flex gap-5 justify-center items-center flex-wrap md:justify-between">
        <div className="flex gap-5 md:gap-20 items-center flex-col md:flex-row">
          {user.image_url ? (
            <img
              src={user.image_url}
              alt="User"
              className="w-20 h-20 rounded-full object-cover border-2 border-dark"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-dark flex items-center justify-center bg-primary p-2">
              <LogoIcon />
            </div>
          )}
          <Tag
            className="mx-auto"
            color={
              user.role === "superadmin"
                ? "gold"
                : user.role === "admin"
                ? "blue"
                : "green"
            }
          >
            {user.role.toUpperCase()}
          </Tag>
        </div>
        <div className="max-w-48 md:max-w-fit min-w-40 text-center md:text-start inline-flex gap-5 flex-wrap justify-center">
          <p className="font-semibold text-xs md:text-base">{`${
            user?.first_name || ""
          } ${user?.last_name || ""}`}</p>
          <p className="font-bold text-xs md:text-base">{user?.email}</p>
        </div>
        <div className="flex space-x-5 w-fit">
          <Tooltip title="Batafsil Ko'rish">
            <Button
              icon={<InfoCircleOutlined />}
              type="default"
              onClick={() => navigate(`/super-admin/detail-page/${user.id}`)}
              className="bg-blue-500 text-white"
            />
          </Tooltip>
          {user.role !== "superadmin" && (
            <Tooltip title="O'chirish">
              <Button
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                loading={isPending}
                className="bg-red-500 text-white"
              />
            </Tooltip>
          )}
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
        <p>Foydalanuvchini o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </div>
  );
};
