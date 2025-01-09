import React, { useState } from "react";
import { Pagination, List, Flex, Spin, Empty, Table } from "antd";
import { UserCard } from "./userCard";
import { useGetList } from "../../service/query/useGetList";
import { usersEndPoints } from "../../config/endpoints";
import { LogoIcon } from "../../assets/LogoIcon";

export const AllUsers = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, isLoading, isError, error } = useGetList(
    usersEndPoints.list,
    { limit, offset, role: "user" },
    false
  );

  if (isLoading)
    return (
      <Flex align="center" justify="center" className="h-full">
        <Spin />
      </Flex>
    );
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const totalCount = data?.count || 0;

  if (totalCount == 0) {
    return (
      <Flex align="center" justify="center" className="h-full">
        <Empty />
      </Flex>
    );
  }
  console.log(data);

  return (
    <Flex vertical className="py-4">
      <Table
        bordered
        dataSource={data?.users}
        size="small"
        pagination={false}
        title={() => (
          <Flex justify="space-between" wrap gap={12} className="p-3">
            <h2 className="md:text-xl font-bold text-center md:text-left">
              Userlar Ro'yxati
            </h2>
            <p className="text-lg">
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
            title: "Harakat",
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
