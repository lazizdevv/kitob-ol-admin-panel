import React, { useState } from "react";
import { Flex, Pagination, Spin, Table } from "antd";
import { BookCard } from "./BookCard";
import { useGetList } from "../../service/query/useGetList";
import { booksEndPoints } from "../../config/endpoints";

export const BookList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;

  const { data, error, isLoading } = useGetList(booksEndPoints.list, {
    limit,
    offset,
  });

  if (isLoading)
    return (
      <Flex justify="center" className="pt-20">
        <Spin />
      </Flex>
    );
  if (error) return <p>Error: {error.message}</p>;

  const totalCount = data?.count || 0;
  const currentBooks = data?.books || [];

  return (
    <Table
      bordered
      size="small"
      pagination={false}
      dataSource={currentBooks}
      title={() => (
        <Flex align="center" justify="space-between" wrap className="md:p-2">
          <h2 className="md:text-xl font-bold">Kitoblar Ro'yxati</h2>
          <p className="md:text-lg font-medium">
            <span className="font-bold">Jami:</span> {totalCount}
          </p>
        </Flex>
      )}
      columns={[
        {
          title: "Nom",
          key: "id",
          render: (text, record) => (
            <Flex gap={12} align="center">
              <img
                className="w-10 h-10 md:w-16 md:h-16 rounded-md object-contain border-2"
                src={record.img_url}
                alt=""
              />
              <h1>{record.title}</h1>
            </Flex>
          ),
        },
        {
          responsive: ["md"],
          title: "Narx",
          key: "id",
          dataIndex: "price",
          render: (text) => <h1>{text} UZS</h1>,
        },
        {
          width: "150px",
          responsive: ["md"],
          title: "Qo'shilgan sana",
          key: "id",
          dataIndex: "created_at",
          // render: (text) => <h1>{text} UZS</h1>,
        },
        {
          width: "0px",
          title: "Harakat",
          key: "actions",
          render: (text, record) => <BookCard key={record.id} book={record} />,
        },
      ]}
      footer={() => (
        <Flex justify="center" className="mt-4">
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={limit}
            onChange={(page) => {
              setCurrentPage(page);
            }}
            showSizeChanger
            pageSizeOptions={[5, 10, 20, 50, 75, 100]}
            onShowSizeChange={(current, size) => {
              setLimit(size);
              setCurrentPage(current);
            }}
            showQuickJumper
          />
        </Flex>
      )}
    />
  );
};
