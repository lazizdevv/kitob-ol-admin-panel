import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Grid, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { DistrictsCard } from "./districts-card";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { districtsEndPoints } from "../../config/endpoints";

export const DistrictFilter = ({ city_id }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { data, isLoading, error } = useGetList(districtsEndPoints.list, {
    name: debouncedSearchTerm,
    city_id,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <Flex vertical className="w-full space-y-4">
      <Flex justify="space-between" gap={24}>
        <div className=" max-w-sm">
          <Link to={`/admin/create-district/${city_id}`}>
            <Button
              children={screens.md ? "Tuman Qo'shish" : ""}
              size="large"
              icon={<PlusCircleOutlined />}
              type="primary"
            />
          </Link>
        </div>
        <Flex justify="end" align="center" className="w-full max-w-lg">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tumanni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data?.Count > 0 ? (
        <div className="transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3">
          <Table
            bordered
            size="small"
            pagination={false}
            dataSource={data?.Districts?.districts}
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
                  <DistrictsCard key={record.id} category={record} />
                ),
              },
            ]}
          />
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday tuman topilmadi
          </div>
        )
      )}
    </Flex>
  );
};
