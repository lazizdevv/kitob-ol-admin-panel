import React, { useState } from "react";
import { Spin, Alert, Pagination, Select, Flex, Table } from "antd";
import { PublisherCard } from "./publishers-card";
import { useGetList } from "../../service/query/useGetList";
import { publishersEndPoints } from "../../config/endpoints";
import { LogoIcon } from "../../assets/LogoIcon";

const { Option } = Select;

export const PublishersList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("publisher");
  const [status, setStatus] = useState("active");
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useGetList(
    publishersEndPoints.list,
    {
      type,
      status,
      limit,
      offset,
    }
  );

  if (isLoading) {
    return (
      <Flex justify="center" className="pt-20">
        <Spin />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Alert message="Xato" description={error.message} type="error" showIcon />
    );
  }
  const totalCount = data?.count || 0;
  const currentPublishers = data.publishers || [];

  console.log(currentPublishers);

  return (
    <Table
      bordered
      pagination={false}
      size="small"
      dataSource={currentPublishers}
      title={() => (
        <Flex
          justify="space-between"
          className="md:px-2"
          align="center"
          wrap
          gap={12}
        >
          <h1 className="md:text-xl text-dark font-bold">
            {type == "publisher"
              ? "Nashriyotchilar Ro'yxati"
              : "Do'konlar Ro'yxati"}
          </h1>
          <Flex gap={12}>
            <Select
              defaultValue={type}
              style={{ width: 170 }}
              onChange={(value) => setType(value)}
            >
              <Option value="publisher">Nashriyot</Option>
              <Option value="shop">Do'kon</Option>
            </Select>

            <Select
              defaultValue={status}
              style={{ width: 170 }}
              onChange={(value) => setStatus(value)}
            >
              <Option value="active">Faol</Option>
              <Option value="non-active">Faol emas</Option>
            </Select>
          </Flex>

          <h1 className="md:text-xl text-dark font-bold">Jami: {totalCount}</h1>
        </Flex>
      )}
      columns={[
        {
          width: "0px",

          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (text, record) => (
            <Flex gap={12} align="center">
              {record.image_url ? (
                <img
                  src={record.image_url}
                  alt=""
                  className="w-10 h-10 md:w-16 max-h-16 md:h-20 rounded-full object-cover border-2 border-dark"
                />
              ) : (
                <Flex
                  align="center"
                  justify="center"
                  className="w-16 h-16 rounded-full object-cover border-2 border-dark p-1"
                >
                  <LogoIcon />
                </Flex>
              )}

              <h1>{text}</h1>
            </Flex>
          ),
        },
        {
          width: "0px",
          responsive: ["md"],
          title: "Tel",
          dataIndex: "phone_number",
          key: "id",
        },

        {
          width: "0px",
          responsive: ["md"],
          title: "Email",
          dataIndex: "email",
          key: "id",
        },
        {
          width: "1%",
          title: "Harakat",
          dataIndex: "id",
          key: "id",
          render: (text, record) => <PublisherCard publisher={record} />,
        },
      ]}
      footer={() => (
        <Flex justify="center" className="mt-4">
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={limit}
            onChange={(page) => setCurrentPage(page)}
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
