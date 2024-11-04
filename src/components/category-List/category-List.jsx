import React, { useState } from "react";
import { Pagination } from "antd";
import { CategoryCard } from "../category-card/category-card";
import { useGetCategories } from "../../service/query/useGetCategoriesList";
import { Loading } from "../loading/loading";

export const CategoriesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * limit; // Offset hisoblash
const { data, error, isLoading } = useGetCategories("", limit, offset);
  // console.log(data);
  
  if (isLoading) return <Loading/>
  if (error) return <p>Xatolik: {error.message}</p>; 

  // Kategoriyalardan totalCount ni olish
  const totalCount = data?.Count || 0; // Agar data bo'lmasa, 0 deb olamiz

  const currentCategories = data.Categories?.categories || []; 
  
  // console.log(currentCategories);
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Kategoriyalar</h2>

      <div className="grid grid-cols-1 md:grid-cols-1">
        {currentCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
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
