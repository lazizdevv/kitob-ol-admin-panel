import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Flex, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { PublisherCard } from "./publishers-card";
import { useGetList } from "../../service/query/useGetList";
import { publishersEndPoints } from "../../config/endpoints";

export const PublishersFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetList(publishersEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="w-full space-y-4">
      <Flex wrap justify="end" gap={24}>
        <Flex justify="center" className="w-full max-w-screen-sm">
          <Input
            suffix={<SearchOutlined />}
            type="text"
            placeholder="nashriyotchini va do'konni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data?.count > 0 ? (
        <div className="transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          <Table
            bordered
            size="small"
            dataSource={data.publishers}
            pagination={false}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                  <Flex gap={12} align="center">
                    {record.image_url ? (
                      <img
                        src={record.image_url}
                        alt=""
                        className="w-10 max-h-10 h-20 rounded-full object-cover border-2 border-dark"
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
                responsive: ["md"],
                title: "Tel",
                dataIndex: "phone_number",
                key: "id",
              },

              {
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
          />
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday malumot topilmadi
          </div>
        )
      )}
    </div>
  );
};
