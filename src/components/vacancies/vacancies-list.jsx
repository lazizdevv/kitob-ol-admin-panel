import React, { useState } from "react";
import { Spin, Pagination, message, Flex, Table, Button, Empty } from "antd";
import { useGetList } from "../../service/query/useGetList";
import { vacanciesEndPoints } from "../../config/endpoints";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";

export const VacanciesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useGetList(
    vacanciesEndPoints.list,
    {
      limit: limit,
      offset,
    }
  );

  const totalCount = data?.count;

  const handlePageChange = (page, limit) => {
    setCurrentPage(page);
    setLimit(limit);
  };

  if (isError) {
    message.error("Vakansiyalar yuklanmadi. Iltimos qayta urinib ko'ring.");
    console.error("Error fetching vacancies:", error);
  }

  if (isLoading)
    return (
      <Flex justify="center" align="center" className="h-full pt-20">
        <Spin />
      </Flex>
    );

  if (totalCount == 0 || undefined)
    return (
      <Flex justify="center" align="center" className="pt-20">
        <Empty />
      </Flex>
    );

  return (
    <Table
      className="w-full"
      size="small"
      bordered
      dataSource={data?.vacancies || []}
      pagination={false}
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
      footer={() => (
        <Flex justify="center" className="mt-4">
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={totalCount}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={["5", "10", "20", "50", "100"]}
          />
        </Flex>
      )}
    />
  );
};
