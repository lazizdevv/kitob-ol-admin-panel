import React, { useState } from "react";
import { Flex, Table } from "antd";
import { DistrictsCard } from "./districts-card";
import { useGetList } from "../../service/query/useGetList";
import { districtsEndPoints } from "../../config/endpoints";

export const DistrictsList = ({ city_id }) => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, isLoading } = useGetList(districtsEndPoints.list, {
    city_id,
    limit,
    offset,
  });

  const totalCount = data?.Count || 0;

  return (
    <Table
      bordered
      size="small"
      loading={isLoading}
      dataSource={data?.Districts?.districts?.map((item) => ({
        ...item,
        key: item.id,
      }))}
      title={() => (
        <Flex justify="space-between" wrap gap={12} className="p-3">
          <h2 className="md:text-xl font-bold mb-4">Tumanlar Ro'yxati</h2>
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
          // responsive: ["md"],
          title: "Nom-EN",
          key: "id",
          dataIndex: ["name", "en"],
        },
        {
          width: "0",
          title: "",

          key: "action",
          render: (text, record) => (
            <DistrictsCard key={record.id} category={record} />
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
