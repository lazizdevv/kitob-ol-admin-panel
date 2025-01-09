import React, { useState } from "react";
import { Pagination, List, Flex, Spin, Empty, Table } from "antd";
import { UserCard } from "../users/userCard";
import { useGetList } from "../../service/query/useGetList";
import { usersEndPoints } from "../../config/endpoints";
import { LogoIcon } from "../../assets/LogoIcon";

export const AdminChange = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useGetList(
    usersEndPoints.list,
    {
      limit,
      offset,
      role: "admin",
    },
    false
  );

  const totalCount = data?.count || 0;
  if (isLoading)
    return (
      <Flex justify="center" align="center" className="h-full">
        <Spin />
      </Flex>
    );
  if (totalCount == 0)
    return (
      <Flex justify="center" align="center" className="h-full">
        <Empty />
      </Flex>
    );
  if (isError) return <div>Xatolik: {error?.message}</div>;

  return (
    <Flex vertical className="py-4">
      <Table
        bordered
        size="small"
        dataSource={data?.users}
        pagination={false}
        title={() => (
          <Flex
            justify="space-between"
            wrap
            align="center"
            gap={12}
            className="md:p-2"
          >
            <h2 className="md:text-xl font-bold">Adminlar Ro'yxati</h2>
            <p className="md:text-lg font-bold">
              <span>Jami: </span> {totalCount}
            </p>
          </Flex>
        )}
        columns={[
          {
            title: "Ism",
            render: (text, record) => (
              <Flex align="center" gap={12}>
                {record.image_url ? (
                  <img
                    src={record.image_url}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover border-2 border-dark"
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
              onChange={(page) => setCurrentPage(page)}
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
