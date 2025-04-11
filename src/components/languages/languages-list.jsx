import React, { useState } from "react";
import { Flex, Table } from "antd";
import { LanguagesCard } from "./languages-card";
import { useGetList } from "../../service/query/useGetList";
import { languagesEndPoints } from "../../config/endpoints";

export const LanguagesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, isLoading } = useGetList(languagesEndPoints.list, {
    limit,
    offset,
  });

  const totalCount = data?.Count || 0;

  return (
    <Table
      size="small"
      bordered
      loading={isLoading}
      dataSource={data?.languages?.languages.map((item) => ({
        ...item,
        key: item.id,
      }))}
      title={() => (
        <Flex
          justify="space-between"
          align="center"
          wrap
          gap={12}
          className="p-3"
        >
          <h2 className="md:text-xl font-bold">Tillar Ro'yxati</h2>
          <p className="md:text-lg">
            <span className="font-bold">Jami: </span> {totalCount}
          </p>
        </Flex>
      )}
      columns={[
        {
          title: "Nom-UZ",
          key: "id",
          dataIndex: ["name", "uz"],
        },
        {
          title: "Nom-RU",
          key: "id",
          dataIndex: ["name", "ru"],
        },
        {
          title: "Nom-EN",
          key: "id",
          dataIndex: ["name", "en"],
        },
        {
          width: "0px",
          title: "Harakat",
          key: "action",
          render: (text, record) => (
            <LanguagesCard key={record.id} category={record} />
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
