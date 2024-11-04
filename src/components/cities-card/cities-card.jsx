import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDeleteCities } from "../../service/mutation/useDeleteCities";

const { Text } = Typography;

export const CitiesCard = ({ category }) => {
  const { mutate: deleteCities, isLoading } = useDeleteCities();
  const role = loadState("user");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    deleteCities(category.id, {
      onSuccess: () => {
        toast.success(`${category.name.uz || "shahar"} o'chirildi`);
        setIsModalVisible(false);
      },
      onError: () => {
        toast.error(`shahar o'chirishda xato yuz berdi!`);
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateLink =
    role.role === "superadmin"
      ? `/super-admin/cities-update/${category.id}`
      : `/admin/cities-update/${category.id}`;
  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/cities-detail/${category.id}`
      : `/admin/cities-detail/${category.id}`;
  const addDistrictsLink =
    role.role === "superadmin"
      ? `/super-admin/create-district/${category.id}`
      : `/admin/create-district/${category.id}`;

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
      <div className="flex space-x-10 md:space-x-14 mt-4 md:mt-0">
        <Tooltip title="Yangi tuman qo'shish">
          <Link to={addDistrictsLink}>
            <Button type="primary" icon={<PlusOutlined />}></Button>
          </Link>
        </Tooltip>

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
            onClick={showDeleteConfirm}
            disabled={isLoading}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="O'chirishni tasdiqlash"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Tasdiqlash"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isLoading }}
      >
        <p>{`${category.name.uz} shahri ` || "shahar"} o'chirilsinmi?</p>
      </Modal>
    </div>
  );
};
