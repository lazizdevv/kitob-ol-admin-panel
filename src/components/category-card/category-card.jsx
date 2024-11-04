import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal } from "antd";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export const CategoryCard = ({ category }) => {
  const { mutate: deleteCategory, isLoading } = useDeleteCategory();
  const role = loadState("user");

  // States for confirmation modal
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        toast.success(`${category.name.uz || "Kategoriya"} o'chirildi`);
        setConfirmVisible(false); // Close modal on success
      },
      onError: () => {
        toast.error(`Kategoriya o'chirishda xato yuz berdi!`);
        setConfirmVisible(false); // Close modal on error
      },
    });
  };

  const updateLink =
    role.role === "superadmin"
      ? `/super-admin/categories-update/${category.id}`
      : `/admin/categories-update/${category.id}`;
  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/categories-detail/${category.id}`
      : `/admin/categories-detail/${category.id}`;

  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm shadow-primary flex flex-col md:flex-row items-center justify-between w-full mb-4">
      <div className="w-full md:flex-1">
        {/* Category Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <Text className="text-lg text-start">
            {category.name.uz || "N/A"}
          </Text>
          <Text className="text-lg text-start">
            {category.name.en || "N/A"}
          </Text>
          <Text className="text-lg text-start">
            {category.name.ru || "N/A"}
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
        <p>Kategoriyani o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </div>
  );
};
