import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal } from "antd";
import { useDeleteBook } from "../../service/mutation/useDeleteBook";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const BookCard = ({ book }) => {
  const { mutate: deleteBook, isLoading } = useDeleteBook();
  const role = loadState("user") || {};
  const [showFullDescription, setShowFullDescription] = useState(false);

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
        toast.success(`${book.title || "Kitob"} muvaffaqiyatli o'chirildi`);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Kitobni o'chirishda xato yuz berdi!"
        );
      },
    });
  };

  const detailLink =
    role?.role === "superadmin"
      ? `/super-admin/books-detail/${book.id}`
      : `/admin/books-detail/${book.id}`;

  // Show only a portion of the description if it's too long
  const MAX_LENGTH = 100;
  const displayedDescription = showFullDescription
    ? book.description
    : `${book.description.slice(0, MAX_LENGTH)}${
        book.description.length > MAX_LENGTH ? "..." : ""
      }`;

  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm shadow-primary flex flex-col md:flex-row items-center justify-between w-full mb-4">
      <div className="w-full md:flex-1">
        {/* Book Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <Text className="text-lg text-start">{book.title || "N/A"}</Text>
          <Text className="text-lg text-start">
            {displayedDescription}{" "}
            {book.description.length > MAX_LENGTH && (
              <Button
                type="link"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Kamroq ko'rsat" : "Batafsil ko'rsat"}
              </Button>
            )}
          </Text>
          <Text className="text-lg text-start">
            {book.published_year || "N/A"}
          </Text>
          <Text className="text-lg text-start">{book.price} UZS</Text>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Tooltip title="Batafsil ko'rish">
          <Link to={detailLink}>
            <Button
              type="link"
              icon={<InfoCircleOutlined />}
              className="bg-blue-500 text-white"
            />
          </Link>
        </Tooltip>

        <Tooltip title="O'chirish">
          <Button
            type="link"
            loading={isLoading}
            onClick={confirmDelete}
            disabled={isLoading}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </div>
    </div>
  );
};
