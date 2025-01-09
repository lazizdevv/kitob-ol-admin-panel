import React, { useState } from "react";
import { Button, Modal, Flex, message, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const TranslatorCard = ({ translator }) => {
  const { mutate: deleteTranslator, isPending } = useDeleteById(
    tarnslatorsEndPoints.delete,
    tarnslatorsEndPoints.list
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => setIsModalVisible(true);

  const handleDelete = () => {
    deleteTranslator(translator.id, {
      onSuccess: () => {
        message.success(
          `${translator.name?.uz || "Translator"} deleted successfully`
        );
        setIsModalVisible(false);
      },
      onError: () => {
        message.error("Error occurred while deleting translator!");
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <Flex justify="center">
      <Dropdown
        trigger={["click"]}
        placement="bottomLeft"
        menu={{
          items: [
            {
              key: "edit",
              label: (
                <Link to={`/admin/translator-update/${translator.id}`}>
                  <Button type="primary" icon={<EditOutlined />}>
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
                  type="default"
                  loading={isPending}
                  onClick={showDeleteConfirm}
                  disabled={isPending}
                  icon={<DeleteOutlined />}
                  className="bg-red-500 text-white"
                >
                  O'shirish
                </Button>
              ),
            },
          ],
        }}
      >
        <Button size="small" icon={<MoreOutlined />} />
      </Dropdown>

      <Modal
        title="Oʻchirishni tasdiqlang"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isPending }}
      >
        <p>
          {`${translator?.name} ${translator?.surname}`} tarjimonni o'chirishni
          tasdiqlaysizmi?
        </p>
      </Modal>
    </Flex>
  );
};
