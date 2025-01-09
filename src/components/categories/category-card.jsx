import React, { useState } from "react";
import { Button, Typography, Modal, Flex, message, Dropdown } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { categoriesEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const CategoryCard = ({ category }) => {
  const { mutate: deleteCategory, isPending } = useDeleteById(
    categoriesEndPoints.delete,
    categoriesEndPoints.list
  );

  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        setConfirmVisible(false);
        message.success(`${category.name.uz} Kategoriya o'chirildi`);
      },
      onError: () => {
        message.error(`Kategoriya o'chirishda xato yuz berdi!`);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <Flex justify="center">
      <Dropdown
        menu={{
          items: [
            {
              key: "view",
              label: (
                <Link
                  className="w-full"
                  to={`/admin/categories-detail/${category.id}`}
                >
                  <Button
                    size="small"
                    className="border border-blue-500"
                    block
                    type="link"
                    icon={<InfoCircleOutlined />}
                  >
                    Batafsil
                  </Button>
                </Link>
              ),
            },
            {
              key: "edit",
              label: (
                <Link className="w-full" to={`/admin/categories-update/${category.id}`}>
                  <Button
                    block
                    size="small"
                    type="primary"
                    icon={<EditOutlined />}
                  >
                    Tahrirlash
                  </Button>
                </Link>
              ),
            },
            {
              key: "delete",
              label: (
                <Button
                  block
                  danger
                  type="primary"
                  size="small"
                  loading={isPending}
                  onClick={() => setConfirmVisible(true)}
                  disabled={isPending}
                  icon={<DeleteOutlined />}
                >
                  O'chirish
                </Button>
              ),
            },
          ],
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Button className="border rounded-md" size="small">
          <MoreOutlined />
        </Button>
      </Dropdown>
      <Modal
        okButtonProps={{ loading: isPending }}
        title="O'chirishni tasdiqlang"
        open={confirmVisible}
        onOk={handleDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
      >
        <Text>Kategoriyani o'chirishni tasdiqlaysizmi?</Text>
      </Modal>
    </Flex>
  );
};
