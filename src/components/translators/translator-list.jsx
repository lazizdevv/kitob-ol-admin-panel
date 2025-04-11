import React, { useState } from "react";
import { Flex, Table } from "antd";
import { TranslatorCard } from "../translators/translator-card";
import { useGetList } from "../../service/query/useGetList";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const TranslatorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = useGetList(tarnslatorsEndPoints.list, {
    limit,
    offset,
  });

  const totalCount = data?.count;

  return (
    <Table
      size="small"
      bordered
      loading={isLoading}
      dataSource={data?.translators?.map((item) => ({
        ...item,
        key: item.id,
      }))}
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
      pagination={{
        pageSize: limit,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage: true,
        position: ["bottomCenter"],
        size: "default",
        current: currentPage,
        total: totalCount,
        onChange: (page) => {
          setCurrentPage(page);
        },
        onShowSizeChange: (current, size) => {
          setLimit(size);
          setCurrentPage(current);
        },
        showQuickJumper: true,
        responsive: true,
        defaultPageSize: limit,
        pageSizeOptions: [5, 10, 20, 50, 75, 100],
        hideOnSinglePage: true,
      }}
    />
  );
};
