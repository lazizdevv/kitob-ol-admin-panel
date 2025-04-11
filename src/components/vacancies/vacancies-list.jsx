import React, { useState } from "react";
import { Flex, Table, Button } from "antd";
import { useGetList } from "../../service/query/useGetList";
import { vacanciesEndPoints } from "../../config/endpoints";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";

export const VacanciesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = useGetList(vacanciesEndPoints.list, {
    limit: limit,
    offset,
  });

  const totalCount = data?.count;

  return (
    <Table
      loading={isLoading}
      className="w-full"
      size="small"
      bordered
      dataSource={data?.vacancies.map((item) => ({
        ...item,
        key: item.id,
      }))}
      title={() => (
        <Flex
          justify="space-between"
          align="center"
          wrap
          className="font-bold text-lg mt-4"
        >
          <h1>Vakansiyalar Ro'yxati</h1>
          <p>
            <span className="text-xl">Jami:</span> {totalCount}
          </p>
        </Flex>
      )}
      columns={[
        {
          title: "Sarlavha",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Maosh",
          dataIndex: "salary_from",
          key: "salary_from",
          render: (text, record) => (
            <span>
              {record.salary_from} - {record.salary_to} UZS
            </span>
          ),
        },
        {
          width: "0px",
          title: "Harakat",
          dataIndex: "id",
          key: "view",
          render: (text, record) => (
            <Flex justify="center">
              <Link to={`/admin/vacancies-detail/${text}`}>
                <Button
                  className="border border-blue-500"
                  size="small"
                  icon={<InfoCircleOutlined />}
                  type="link"
                />
              </Link>
            </Flex>
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
