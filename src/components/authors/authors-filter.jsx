import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { AuthorsCard } from "./authors-card";
import { Button, Flex, Grid, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { authorsEndPoints } from "../../config/endpoints";

export const AuthorsFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetList(authorsEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <div className="w-full space-y-4">
      <Flex justify="space-between" gap={12}>
        <Link to={`/admin/create-authors`}>
          <Button
            children={screens.md ? "Muallif Qo'shish" : ""}
            icon={<PlusCircleOutlined />}
            size="large"
            type="primary"
          />
        </Link>
        <Flex justify="end" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Muallifni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>
      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data.authors?.length > 0 ? (
        <div className="transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3">
          <Table
            size="small"
            bordered
            pagination={false}
            dataSource={data.authors}
            columns={[
              {
                title: "Ism",
                dataIndex: "name",
                key: "id",
              },
              {
                title: "Familiya",
                dataIndex: "surname",
                key: "id",
              },
              {
                width: "5%",
                title: "Harakat",
                key: "actions",
                render: (text, record) => (
                  <Flex>
                    <AuthorsCard key={record.id} author={record} />
                  </Flex>
                ),
              },
            ]}
          />
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday muallif topilmadi
          </div>
        )
      )}
    </div>
  );
};
