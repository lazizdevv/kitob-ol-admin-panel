import React, { useState } from "react";
import { Row, Col, Spin, Alert, Pagination, Select, Empty } from "antd";
import { useGetPublishersList } from "../../service/query/useGetPublishersList";
import { PublisherCard } from "../publishers-card/publishers-card";

const { Option } = Select;

export const PublishersList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("publisher"); // Type uchun state
  const [status, setStatus] = useState("active"); // Status uchun state
  const offset = (currentPage - 1) * limit; // Offset hisoblash

  const { data, isLoading, isError, error } = useGetPublishersList(
    "",
    type, // Type state
    status, // Status state
    limit,
    offset
  );
  console.log(data);

  if (isLoading) {
    return <Spin tip="Nashriyotchilar yuklanmoqda..." />;
  }

  const totalCount = data?.count || 0;
  const currentPublishers = data.publishers || [];

  if (isError) {
    return (
      <Alert message="Xato" description={error.message} type="error" showIcon />
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full gap-4">

        {/* Type va Status tanlash */}
        <div className="flex justify-center gap-4 flex-wrap">
          
          <Select
            defaultValue={type}
            style={{ width: 200 }}
            onChange={(value) => setType(value)}
          >
            <Option value="publisher">Nashriyot</Option>
            <Option value="shop">Do'kon</Option>
          </Select>

          <Select
            defaultValue={status}
            style={{ width: 200 }}
            onChange={(value) => setStatus(value)}
          >
            <Option value="active">Faol</Option>
            <Option value="non-active">Faol emas</Option>
          </Select>
        </div>

        <Row className="flex flex-col w-full" gutter={[16, 16]}>
        <h1 className="p-5 text-dark font-bold">{type == "publisher" ? "Nashriyotchilar Ro'yxati" : "Do'konlar Ro'yxati"}</h1>

          {currentPublishers?.map((publisher) => (
            <Col
              className="w-full max-w-full"
              key={publisher.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <PublisherCard publisher={publisher} />
            </Col>
          ))}
        </Row>

        {totalCount == 0 ? <Empty description="No data"/> : ""}
      </div>

      <div className="flex justify-center gap-10 items-center mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger
          pageSizeOptions={[1, 5, 10, 15, 20, 100]}
          onShowSizeChange={(current, size) => {
            setLimit(size);
            setCurrentPage(1);
          }}
          showQuickJumper
        />
      </div>
    </>
  );
};
