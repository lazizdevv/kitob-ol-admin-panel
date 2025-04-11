import React, { useState } from "react";
import { Flex, Table } from "antd";
import { CitiesCard } from "./cities-card";
import { useGetList } from "../../service/query/useGetList";
import { citiesEndPoints } from "../../config/endpoints";

export const CitiesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, isLoading } = useGetList(citiesEndPoints.list, {
    limit,
    offset,
  });

  const totalCount = data?.Count || 0;
  return (
    <Table
      size="small"
      bordered
      loading={isLoading}
      dataSource={data?.Cities?.cities?.map((item) => ({
        ...item,
        key: item.id,
      }))}
      title={() => (
        <Flex justify="space-between">
          <h2 className="md:text-xl font-bold">Shaharlar Ro'yxati</h2>
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
          title: "Nom-Ru",
          key: "id",
          dataIndex: ["name", "ru"],
        },
        {
          responsive: ["md"],
          title: "Nom-EN",
          key: "id",
          dataIndex: ["name", "en"],
        },
        {
          width: "0",
          title: "Harakat",
          key: "action",
          render: (text, record) => (
            <CitiesCard key={record.id} category={record} />
          ),
        },
      ]}
      pagination={{
        pageSize: limit,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
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
        pageSizeOptions: [5, 10, 20, 50, 75, 100],
      }}
    />
  );
};
