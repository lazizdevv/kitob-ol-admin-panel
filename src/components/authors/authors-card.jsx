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
import { authorsEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const AuthorsCard = ({ author }) => {
  const { mutate: deleteAuthor, isPending } = useDeleteById(
    authorsEndPoints.delete,
    authorsEndPoints.list
  );
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    deleteAuthor(author.id, {
      onSuccess: () => {
        setConfirmVisible(false);
        message.success(`${author.name || "Muallif"} o'chirildi`);
      },
      onError: () => {
        setConfirmVisible(false);
        message.error("Muallifni o'chirishda xato yuz berdi!");
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
              key: "view",
              label: (
                <Link className="w-full" to={`/admin/authors-detail/${author.id}`}>
                  <Button
                    block
                    className="border border-blue-500"
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
                <Link to={`/admin/authors-update/${author.id}`}>
                  <Button block type="primary" icon={<EditOutlined />}>
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
      >
        <Button className="border rounded-md" size="small">
          <MoreOutlined />
        </Button>
      </Dropdown>

      <Modal
        title="O'chirishni tasdiqlang"
        open={confirmVisible}
        onOk={handleDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isPending }}
      >
        <Text>Muallifni o'chirishni tasdiqlaysizmi?</Text>
      </Modal>
    </Flex>
  );
};
