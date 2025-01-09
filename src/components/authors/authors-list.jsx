import React, { useState } from "react";
import { Empty, Flex, Pagination, Spin, Table } from "antd";
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

  if (isLoading)
    return (
      <Flex justify="center" align="center" className="pt-10">
        <Spin />
      </Flex>
    );
  if (error) return <p>Xatolik: {error?.message}</p>;

  const totalCount = data?.count || 0;

  if (totalCount == 0 || undefined)
    return (
      <Flex justify="center" align="center" className="pt-20">
        <Empty />
      </Flex>
    );

  return (
    <Table
      size="small"
      bordered
      dataSource={data?.authors}
      pagination={false}
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
      footer={() => (
        <Flex justify="center" align="center" className="mt-4">
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={limit}
            onChange={(page) => {
              setCurrentPage(page);
            }}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={[5, 10, 20, 50, 75, 100]}
            onShowSizeChange={(current, size) => {
              setLimit(size);
              setCurrentPage(current);
            }}
          />
        </Flex>
      )}
    />
  );
};
