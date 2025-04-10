import React, { useState } from "react";
import { Pagination, Flex, Table, Select } from "antd";
import { UserCard } from "./userCard";
import { useGetList } from "../../service/query/useGetList";
import { usersEndPoints } from "../../config/endpoints";
import { LogoIcon } from "../../assets/LogoIcon";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { SettingOutlined } from "@ant-design/icons";

export const AllUsers = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const [searchByCategory, setSearchByCategory] = useState("");
  const { data, isLoading } = useGetList(
    usersEndPoints.list,
    { limit, offset, role: "user", name: useDebounce(searchByCategory, 500) },
    false
  );

  const totalCount = data?.count || 0;

  return (
    <Flex vertical className="py-4">
      <Table
        loading={isLoading}
        bordered
        dataSource={data?.users.map((item) => ({
          ...item,
          key: item.id,
        }))}
        size="small"
        pagination={false}
        title={() => (
          <Flex justify="space-between" wrap gap={12} className="p-3">
            <h2 className="md:text-xl font-bold text-center md:text-left">
              Userlar Ro'yxati
            </h2>
            <p className="text-lg lg:hidden inline-block">
              <span className="md:text-xl font-bold">Jami: </span> {totalCount}
            </p>
            <Select
              optionLabelProp="value"
              loading={isLoading}
              className="w-full md:w-1/3"
              placeholder="Qidirish"
              showSearch
              allowClear
              optionFilterProp="searchText"
              filterOption={(input, option) =>
                (option?.searchText ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => setSearchByCategory(value)}
              options={data?.users?.map((user) => ({
                label: (
                  <Flex align="center" gap={12}>
                    {user.image_url ? (
                      <img
                        src={user?.image_url}
                        className="w-10 h-10 rounded-full object-cover border-2 border-dark"
                      />
                    ) : (
                      <Flex
                        align="center"
                        justify="center"
                        className="w-10 h-10 rounded-full object-cover border-2 border-dark p-1"
                      >
                        <LogoIcon />
                      </Flex>
                    )}
                    {`${user.first_name || ""} ${user.last_name || ""}`}
                  </Flex>
                ),
                value: user?.first_name, // qidirish uchun qiymat
                searchText: `${user.first_name} ${user.last_name}`, // search uchun matn
              }))}
            />
            <p className="text-lg hidden lg:inline-block">
              <span className="md:text-xl font-bold">Jami: </span> {totalCount}
            </p>
          </Flex>
        )}
        columns={[
          {
            title: "Ism-Familiya",
            render: (text, record) => (
              <Flex align="center" gap={12}>
                {record.image_url ? (
                  <img
                    src={record.image_url}
                    alt=""
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2 border-dark"
                  />
                ) : (
                  <Flex
                    align="center"
                    justify="center"
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2 border-dark p-1"
                  >
                    <LogoIcon />
                  </Flex>
                )}

                <p className="font-semibold text-xs md:text-base">{`${
                  record?.first_name || "Ismsiz"
                } ${record?.last_name || "Familiyasiz"}`}</p>
              </Flex>
            ),
          },
          {
            width: "0",
            title: <SettingOutlined />,
            render: (text, record) => <UserCard user={record} />,
          },
        ]}
        footer={() => (
          <Flex justify="center" className="mt-4">
            <Pagination
              current={currentPage}
              total={totalCount}
              pageSize={limit}
              onChange={(page) => {
                setCurrentPage(page);
              }}
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
    </Flex>
  );
};
