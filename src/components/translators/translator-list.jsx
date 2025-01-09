import React, { useState } from "react";
import { Pagination, message, Flex, Spin, Empty, Table } from "antd";
import { TranslatorCard } from "../translators/translator-card";
import { useGetList } from "../../service/query/useGetList";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const TranslatorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useGetList(
    tarnslatorsEndPoints.list,
    {
      limit,
      offset,
    }
  );

  const totalCount = data?.count;

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setLimit(pageSize);
  };

  if (isError) {
    message.error("Failed to load translators. Please try again.");
    console.error("Error fetching translators:", error);
  }
  if (isLoading) {
    return (
      <Flex justify="center" className="pt-20">
        <Spin />
      </Flex>
    );
  }
  if (totalCount == 0 || undefined) {
    return (
      <Flex justify="center" className="pt-20">
        <Empty />
      </Flex>
    );
  }

  return (
    <Table
      size="small"
      bordered
      dataSource={data?.translators}
      pagination={false}
      title={() => (
        <Flex
          justify="space-between"
          align="center"
          wrap
          gap={12}
          className="p-2"
        >
          <h2 className="md:text-xl font-bold">Tarjimonlar Ro'yxati</h2>
          <p className="md:text-lg">
            <span className="font-bold">Jami: </span> {totalCount}
          </p>
        </Flex>
      )}
      columns={[
        {
          title: "Ism",
          key: "id",
          dataIndex: "name",
        },
        {
          title: "Familiya",
          key: "id",
          dataIndex: "surname",
        },
        {
          width: "5%",
          title: "Harakat",
          key: "id",
          render: (text, record) => (
            <TranslatorCard key={record.id} translator={record} />
          ),
        },
      ]}
      footer={() => (
        <Flex justify="center" className="mt-4">
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={totalCount}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={[5, 10, 20, 50, 75, 100]}
          />
        </Flex>
      )}
    />
  );
};
