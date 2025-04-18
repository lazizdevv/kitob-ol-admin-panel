import React, { useState } from "react";
import { Flex, Table } from "antd";
import { BookCard } from "./BookCard";
import { useGetList } from "../../service/query/useGetList";
import { booksEndPoints } from "../../config/endpoints";

export const BookList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = useGetList(booksEndPoints.list, {
    limit,
    offset,
  });

  const totalCount = data?.count || 0;

  return (
    <Table
      bordered
      size="small"
      loading={isLoading}
      dataSource={data?.books.map((item) => ({
        ...item,
        key: item.id,
      }))}
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
        },
        {
          width: "0px",
          title: "Harakat",
          key: "actions",
          render: (text, record) => <BookCard key={record.id} book={record} />,
        },
      ]}
      pagination={{
        defaultPageSize: limit,
        pageSize: limit,
        current: currentPage,
        total: totalCount,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 50, 75, 100],
        onShowSizeChange: (current, size) => {
          setLimit(size);
          setCurrentPage(current);
        },
        onChange: (page) => {
          setCurrentPage(page);
        },
        showQuickJumper: true,
        position: ["bottomCenter"],
        size: "default",
      }}
    />
  );
};
