import React, { useState } from "react";
import { Empty, Flex, Pagination, Spin, Table } from "antd";
import { LanguagesCard } from "./languages-card";
import { useGetList } from "../../service/query/useGetList";
import { languagesEndPoints } from "../../config/endpoints";

export const LanguagesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(languagesEndPoints.list, {
    limit,
    offset,
  });

  const totalCount = data?.Count || 0;
  if (isLoading)
    return (
      <Flex justify="center" className="pt-20">
        <Spin />
      </Flex>
    );
  if (totalCount == 0 || undefined)
    return (
      <Flex justify="center" className="pt-20">
        <Empty />
      </Flex>
    );
  if (error) return <p>Xatolik: {error.message}</p>;

  const currentlanguages = data.languages?.languages || [];

  return (
    <Table
      size="small"
      bordered
      pagination={false}
      dataSource={currentlanguages}
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
      footer={() => (
        <Flex justify="center" className="mt-4">
          <Pagination
            align="start"
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
