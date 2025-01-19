import React, { useState } from "react";
import { Empty, Flex, Pagination, Spin, Table } from "antd";
import { CitiesCard } from "./cities-card";
import { useGetList } from "../../service/query/useGetList";
import { citiesEndPoints } from "../../config/endpoints";

export const CitiesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(citiesEndPoints.list, {
    limit,
    offset,
  });

  if (isLoading)
    return (
      <Flex justify="center" className="pt-20">
        <Spin />
      </Flex>
    );
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.Count || 0;
  const currentCategories = data.Cities?.cities || [];

  return (
    <Table
      size="small"
      bordered
      pagination={false}
      dataSource={currentCategories}
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
