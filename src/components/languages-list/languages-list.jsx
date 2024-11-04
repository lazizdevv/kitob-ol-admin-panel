import React, { useState } from "react";
import { Pagination } from "antd";
import { Loading } from "../loading/loading";
import { useGetLanguagesList } from "../../service/query/useGetLanguagesList";
import { LanguagesCard } from "../languages-card/languages-card";

export const LanguagesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit; // Offset hisoblash
  const { data, error, isLoading } = useGetLanguagesList("", limit, offset);
  // console.log(data);

  if (isLoading) return <Loading />;
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.Count || 0;

  const currentlanguages = data.languages?.languages || [];

  // console.log(currentlanguages);
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tillar</h2>

      <div className="grid grid-cols-1 md:grid-cols-1">
        {currentlanguages.map((category) => (
          <LanguagesCard key={category.id} category={category} />
        ))}
      </div>

      <div className="flex justify-center gap-10 items-center mt-4">
        <Pagination
        className=""
        align="start"
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page);
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
