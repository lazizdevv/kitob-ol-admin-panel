import React, { useState } from "react";
import { Empty, Flex, Pagination, Spin, Table } from "antd";
import { CategoryCard } from "./category-card";
import { useGetList } from "../../service/query/useGetList";
import { categoriesEndPoints } from "../../config/endpoints";

export const CategoriesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(categoriesEndPoints.list, {
    limit,
    offset,
  });

  const totalCount = data?.Count || 0;

  if (isLoading)
    return (
      <Flex justify="center" align="center" className="p-20">
        <Spin />
      </Flex>
    );

  if (totalCount == 0)
    return (
      <Flex justify="center" align="center" className="pt-20">
        <Empty />
      </Flex>
    );

  if (error) return <p>Xatolik: {error.message}</p>;
  const currentCategories = data.Categories?.categories || [];

  return (
    <Table
      size="small"
      tableLayout="auto"
      bordered
      dataSource={currentCategories}
      pagination={false}
      title={() => (
        <Flex
          align="center"
          justify="space-between"
          gap={12}
          wrap
          className="md:p-2"
        >
          <h2 className="md:text-xl font-bold">Kategoriyalar Ro'yxati</h2>
          <p className="text-lg">
            <span className="md:text-xl font-bold">Jami: </span> {totalCount}
          </p>
        </Flex>
      )}
      columns={[
        {
          title: "Nom-UZ",
          dataIndex: ["name", "uz"],
        },
        {
          title: "Nom-RU",
          dataIndex: ["name", "ru"],
        },

        {
          responsive: ["md"],
          title: "Nom-EN",
          dataIndex: ["name", "en"],
        },
        {
          width: "5%",
          title: "Harakat",
          render: (text, record) => (
            <CategoryCard key={record.id} category={record} />
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
