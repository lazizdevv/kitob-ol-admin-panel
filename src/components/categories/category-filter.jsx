import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { CategoryCard } from "./category-card";
import { Button, Flex, Grid, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { categoriesEndPoints } from "../../config/endpoints";

export const CategoriesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetList(categoriesEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <div className="w-full space-y-4">
      <Flex justify="space-between" gap={12}>
        <div className="w-fit max-w-md">
          <Link to={`/admin/create-categories`}>
            <Button
              children={screens.md ? "Kategoriya Qo'shish" : ""}
              size="large"
              icon={<PlusCircleOutlined />}
              type="primary"
            />
          </Link>
        </div>
        <Flex justify="end" align="center" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Kategoriyani qidiring"
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
        <div
          className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-2 border-2 border-dark"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          <Table
            pagination={false}
            dataSource={data?.Categories.categories}
            columns={[
              { title: "Nom-UZ", dataIndex: ["name", "uz"], key: "id" },
              { title: "Nom-RU", dataIndex: ["name", "ru"], key: "id" },
              {
                width: "5%",
                title: "Harakat",
                render: (text, record) => (
                  <Flex>
                    <CategoryCard key={record.id} category={record} />
                  </Flex>
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
