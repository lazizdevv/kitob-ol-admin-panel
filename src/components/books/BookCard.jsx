import React from "react";
import { Button, Modal, Flex, message, Dropdown } from "antd";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { booksEndPoints } from "../../config/endpoints";

export const BookCard = ({ book }) => {
  const { mutate: deleteBook, isPending } = useDeleteById(
    booksEndPoints.delete,
    booksEndPoints.list,
    false
  );

  const confirmDelete = () => {
    Modal.confirm({
      title: "Kitobni o'chirishni tasdiqlaysizmi?",
      content: `${book.title} kitobini o'chirishga ishonchingiz komilmi?`,
      okText: "Ha, o'chirish",
      okType: "danger",
      cancelText: "Bekor qilish",
      onOk: handleDelete,
    });
  };

  const handleDelete = () => {
    deleteBook(book.id, {
      onSuccess: () => {
        message.success(`${book.title || "Kitob"} muvaffaqiyatli o'chirildi`);
      },
      onError: () => {
        message.error("Kitobni o'chirishda xato yuz berdi!");
      },
    });
  };

  return (
    <Flex justify="center">
      <Dropdown
        placement="bottomLeft"
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "view",
              label: (
                <Link className="w-full" to={`/admin/books-detail/${book.id}`}>
                  <Button
                    block
                    children="Batafsil"
                    type="link"
                    icon={<InfoCircleOutlined />}
                    className="border-blue-500"
                  />
                </Link>
              ),
            },
            {
              key: "delete",
              label: (
                <Button
                  block
                  children="O'chirish"
                  danger
                  type="primary"
                  loading={isPending}
                  onClick={confirmDelete}
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
    </Flex>
  );
};
