import React, { useState } from "react";
import { Flex, Table } from "antd";
import { AuthorsCard } from "./authors-card";
import { useGetList } from "../../service/query/useGetList";
import { authorsEndPoints } from "../../config/endpoints";

export const AuthorsList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(authorsEndPoints.list, {
    limit,
    offset,
  });

  if (error) return <p>Xatolik: {error?.message}</p>;

  const totalCount = data?.count || 0;

  return (
    <Table
      size="small"
      bordered
      loading={isLoading}
      dataSource={data?.authors.map((item) => ({
        ...item,
        key: item.id,
      }))}
      title={() => (
        <Flex
          className="md:p-2"
          align="center"
          gap={12}
          wrap
          justify="space-between"
        >
          <h2 className="md:text-xl font-bold">Mualliflar Ro'yxati</h2>
          <p className="text-lg">
            <span className="md:text-xl font-bold">Jami: </span> {totalCount}
          </p>
        </Flex>
      )}
      columns={[
        {
          title: "Ism",
          dataIndex: "name",
          key: "id",
        },
        {
          title: "Familiya",
          dataIndex: "surname",
          key: "id",
        },
        {
          width: "5%",
          title: "Harakat",
          key: "actions",
          render: (text, record) => (
            <AuthorsCard key={record.id} author={record} />
          ),
        },
      ]}
      pagination={{
        current: currentPage,
        total: totalCount,
        pageSize: limit,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: [5, 10, 20, 50, 75, 100],
        onShowSizeChange: (current, size) => {
          setLimit(size);
          setCurrentPage(current);
        },
        onChange: (page) => {
          setCurrentPage(page);
        },
        position: ["bottomCenter"],
        size: "default",
      }}
    />
  );
};
