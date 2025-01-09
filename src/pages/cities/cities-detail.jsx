import React from "react";
import { Link, useParams } from "react-router-dom";
import { Districts } from "../districts/districts";
import { Button, Spin, Table } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetById } from "../../service/query/useGetById";
import { citiesEndPoints } from "../../config/endpoints";

export const CitiesDetail = () => {
  const { id } = useParams();
  const {
    data: category,
    isLoading,
    error,
  } = useGetById(citiesEndPoints.get, id);

  if (isLoading) return <Spin />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="w-full border-2">
      <div className="flex justify-between">
        <Link to={`/admin/cities`}>
          <Button
            shape="circle"
            type="primary"
            icon={<ArrowLeftOutlined />}
          ></Button>
        </Link>
        <h1 className="md:text-xl font-bold text-center mb-6 text-black">
          Batafsil Sahifa
        </h1>
        <div className=""></div>
      </div>

      <div className=" bg-white">
        <Table
          size="small"
          bordered
          pagination={false}
          dataSource={[
            {
              nameUZ: category.name.uz,
              nameRU: category.name.ru,
              nameEN: category.name.en,
            },
          ]}
          columns={[
            {
              title: "Nom-UZ",
              dataIndex: "nameUZ",
            },
            {
              title: "Nom-RU",
              dataIndex: "nameRU",
            },
            {
              title: "Nom-EN",
              dataIndex: "nameEN",
            },
          ]}
        />

        <Districts cityId={id} />
      </div>
    </div>
  );
};
