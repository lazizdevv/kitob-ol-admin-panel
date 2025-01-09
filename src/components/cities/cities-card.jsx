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
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { citiesEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const CitiesCard = ({ category }) => {
  const { mutate: deleteCities, isPending } = useDeleteById(
    citiesEndPoints.delete,
    citiesEndPoints.list
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    deleteCities(category.id, {
      onSuccess: () => {
        message.success(`${category.name.uz} o'chirildi`);
        setIsModalVisible(false);
      },
      onError: () => {
        message.error(`shahar o'chirishda xato yuz berdi!`);
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateLink = `/admin/cities-update/${category.id}`;
  const detailLink = `/admin/cities-detail/${category.id}`;
  const addDistrictsLink = `/admin/create-district/${category.id}`;

  return (
    <Flex justify="center">
      <Dropdown
        trigger={["click"]}
        placement="bottomLeft"
        menu={{
          items: [
            {
              key: "add-district",
              label: (
                <Link to={addDistrictsLink}>
                  <Button
                    className="border-dark"
                    children="Tuman qo'shish"
                    type="text"
                    icon={<PlusOutlined />}
                  ></Button>
                </Link>
              ),
            },
            {
              key: "view",
              label: (
                <Link className="w-full" to={detailLink}>
                  <Button
                    block
                    children="Batafsil"
                    type="link"
                    className="border-blue-500"
                    icon={<InfoCircleOutlined />}
                  />
                </Link>
              ),
            },
            {
              key: "edit",
              label: (
                <Link className="w-full" to={updateLink}>
                  <Button
                    block
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
                  block
                  danger
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
        <Text>{`${category.name.uz} shahri ` || "shahar"} o'chirilsinmi?</Text>
      </Modal>
    </Flex>
  );
};
