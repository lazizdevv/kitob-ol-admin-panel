import React, { useState } from "react";
import { Button, Space, Tooltip, Typography, Modal } from "antd";
import { useDeleteAuthor } from "../../service/mutation/useDeleteAuthors";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export const AuthorsCard = ({ author }) => {
  const { mutate: deleteAuthor, isLoading } = useDeleteAuthor();
  const role = loadState("user");

  // State for the confirmation modal
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    deleteAuthor(author.id, {
      onSuccess: () => {
        toast.success(`${author.name || "Muallif"} o'chirildi`);
        setConfirmVisible(false); // Close modal on success
      },
      onError: () => {
        toast.error(`Muallifni o'chirishda xato yuz berdi!`);
        setConfirmVisible(false); // Close modal on error
      },
    });
  };

  const updateLink =
    role.role === "superadmin"
      ? `/super-admin/authors-update/${author.id}`
      : `/admin/authors-update/${author.id}`;
  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/authors-detail/${author.id}`
      : `/admin/authors-detail/${author.id}`;

  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm shadow-primary flex flex-col md:flex-row items-center justify-between w-full mb-4">
      <div className="w-full md:flex-1">
        {/* Author Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <Text className="text-lg text-start">{author.name || "N/A"}</Text>
          <Text className="text-lg text-start">{author.surname || "N/A"}</Text>
          <Text className="text-lg text-start">
            {author.biography || "N/A"}
          </Text>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-14 mt-4 md:mt-0">
        <Tooltip title="Batafsil ko'rish">
          <Link to={detailLink}>
            <Button
              className="bg-blue-500 text-white"
              type="default"
              icon={<InfoCircleOutlined />}
            />
          </Link>
        </Tooltip>

        <Tooltip title="Tahrirlash">
          <Link to={updateLink}>
            <Button
              className="bg-yellow-500 hover:bg-yellow-700"
              type="primary"
              icon={<EditOutlined />}
            />
          </Link>
        </Tooltip>

        <Tooltip title="O'chirish">
          <Button
            type="default"
            loading={isLoading}
            onClick={() => setConfirmVisible(true)} // Show confirmation modal
            disabled={isLoading}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="O'chirishni tasdiqlang"
        visible={confirmVisible}
        onOk={handleDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
      >
        <p>Muallifni o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </div>
  );
};

// export default AuthorsCard;
