import React, { useState } from "react";
import { Empty, Flex, Pagination, Table } from "antd";
import { Loading } from "../loading/loading";
import { DistrictsCard } from "./districts-card";
import { useGetList } from "../../service/query/useGetList";
import { districtsEndPoints } from "../../config/endpoints";

export const DistrictsList = ({ city_id }) => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(districtsEndPoints.list, {
    city_id,
    limit,
    offset,
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.Count || 0;
  const currentCategories = data.Districts?.districts || [];

  return (
    <Table
      bordered
      size="small"
      pagination={false}
      dataSource={currentCategories}
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
