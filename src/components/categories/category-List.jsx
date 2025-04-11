import React, { useState } from "react";
import { Flex, Table } from "antd";
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

  if (error) return <p>Xatolik: {error.message}</p>;

  return (
    <Table
      size="small"
      tableLayout="auto"
      bordered
      loading={isLoading}
      dataSource={data?.Categories?.categories?.map((item) => ({
        ...item,
        key: item.id,
      }))}
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
      pagination={{
        defaultPageSize: limit,
        pageSize: limit,
        current: currentPage,
        total: totalCount,
        showSizeChanger: true,
        position: ["bottomCenter"],
        size: "default",
        pageSizeOptions: [5, 10, 20, 50, 75, 100],
        onShowSizeChange: (current, size) => {
          setLimit(size);
          setCurrentPage(current);
        },
        onChange: (page) => {
          setCurrentPage(page);
        },
        showQuickJumper: true,
      }}
    />
  );
};
