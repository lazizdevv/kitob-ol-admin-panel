import React, { useState } from "react";
import { Pagination } from "antd";
import { Loading } from "../loading/loading";
import { useGetDistrictsList } from "../../service/query/useGetDistrictsList";
import { DistrictsCard } from "../districts-card/districts-card";

export const DistrictsList = ({ cityId }) => {
  console.log(cityId);

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit; // Offset hisoblash
  const { data, error, isLoading } = useGetDistrictsList(
    "",
    cityId,
    limit,
    offset
  );
  console.log(data);

  if (isLoading) return <Loading />;
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.Count || 0;

  const currentCategories = data.Districts?.districts || [];

  console.log(currentCategories);
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tumanlar</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {currentCategories.map((category) => (
          <DistrictsCard key={category.id} category={category} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page); // Sahifa o'zgarishini yangilash
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20, 100]}
          onShowSizeChange={(current, size) => {
            setLimit(size); // Sahifa o'lchamini o'zgartirish
            setCurrentPage(1); // Sahifani 1 ga qaytarish
          }}
          showQuickJumper // Tez sahifa o'zgartirish imkoniyati
        />
      </div>
    </div>
  );
};
