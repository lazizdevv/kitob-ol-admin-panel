import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Grid, Input, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { TranslatorCard } from "../translators/translator-card";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const TranslatorFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { data, isLoading, error } = useGetList(tarnslatorsEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="w-full space-y-4">
      <Flex justify="space-between" gap={12}>
        <Link to={`/admin/create-translator`}>
          <Button
            children={screens.md ? "Tarjimon Qo'shish" : ""}
            icon={<PlusCircleOutlined />}
            size="large"
            type="primary"
          />
        </Link>
        <Flex justify="end" align="center" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tarjimonni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data?.translators?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          <Table
            size="small"
            bordered
            pagination={false}
            dataSource={data?.translators}
            columns={[
              {
                title: "Ism",
                key: "id",
                dataIndex: "name",
              },
              {
                title: "Familiya",
                key: "id",
                dataIndex: "surname",
              },
              {
                width: "5%",
                title: "Harakat",
                key: "id",
                render: (text, record) => (
                  <TranslatorCard key={record.id} translator={record} />
                ),
              },
            ]}
          />
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday Tarjimon topilmadi
          </div>
        )
      )}
    </div>
  );
};
