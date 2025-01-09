import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Grid, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { LanguagesCard } from "./languages-card";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { languagesEndPoints } from "../../config/endpoints";

export const LanguagesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { data, isLoading, error } = useGetList(languagesEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="w-full space-y-4">
      <Flex justify="space-between" gap={12}>
        <Link to={`/admin/create-languages`}>
          <Button
            children={screens.md ? "Til Qo'shish" : ""}
            icon={<PlusCircleOutlined />}
            type="primary"
            size="large"
          />
        </Link>
        <div className="flex items-center w-full max-w-screen-sm justify-end ">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tilni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Flex>{" "}
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
            dataSource={data.languages?.languages}
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
          />
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday Til topilmadi
          </div>
        )
      )}
    </div>
  );
};
