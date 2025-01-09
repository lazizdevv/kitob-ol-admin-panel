import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Grid, Input, Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { CitiesCard } from "./cities-card";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { citiesEndPoints } from "../../config/endpoints";

export const CitiesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { data, isLoading, error } = useGetList(citiesEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="w-full space-y-4">
      <Flex justify="space-between" gap={12}>
        <div className="">
          <Link to={"/admin/create-cities"}>
            <Button
              // block
              icon={<PlusCircleOutlined />}
              children={screens.md ? "Shahar Qo'shish" : ""}
              type="primary"
              size="large"
            />
          </Link>
        </div>
        <Flex justify="end" align="center" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Shaharni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <h1 className="text-center">Yuklanmoqda...</h1>
      ) : debouncedSearchTerm && data?.Count > 0 ? (
        <div className="transition-all duration-100  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3">
          <Table
            size="small"
            bordered
            pagination={false}
            dataSource={data?.Cities?.cities}
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
          />
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday kategoriya topilmadi
          </div>
        )
      )}
    </div>
  );
};
