import React, { useState } from "react";
import { Pagination } from "antd";
import { BookCard } from "../bookCard/BookCard"; // Import yo'li to'g'rilangan
import { useGetBooks } from "../../service/query/useGetBooks"; // Import yo'li to'g'rilangan
import { Loading } from "../loading/loading"; // Loading komponenti uchun import

export const BookList = () => {
  // Pagination uchun limit va currentPage uchun state
  const [limit, setLimit] = useState(10); // Bir sahifada ko'rsatiladigan elementlar soni
  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa raqami

  // Offsetni hisoblash: Sahifa raqamiga qarab qaysi kitoblardan boshlanishini belgilash
  const offset = (currentPage - 1) * limit;

  // useGetBooks hook yordamida ma'lumotlarni olish
  const { data, error, isLoading } = useGetBooks({ limit, offset }); // `title`ni berish shart emas, agar kerak bo'lmasa

  // Agar ma'lumotlar yuklanayotgan bo'lsa, Loading komponentini ko'rsatish
  if (isLoading) return <Loading />;
  // Agar xatolik bo'lsa, xatolik haqida xabar chiqarish
  if (error) return <p>Error: {error.message}</p>;

  // Kelgan data ichidan umumiy kitoblar soni va hozirgi sahifadagi kitoblar ro'yxatini olish
  const totalCount = data?.count || 0; // Umumiy kitoblar soni
  const currentBooks = data?.books || []; // Hozirgi sahifadagi kitoblar ro'yxati

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Books</h2>

      {/* Kitob kartalari ro'yxatini chiqarish */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Pagination komponenti */}
      <div className="flex justify-center items-center mt-4">
        <Pagination
          current={currentPage} // Hozirgi sahifa raqami
          total={totalCount} // Umumiy kitoblar soni
          pageSize={limit} // Har bir sahifadagi kitoblar soni
          onChange={(page) => {
            setCurrentPage(page); // Sahifa raqamini yangilash
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20, 100]} // Sahifa hajmi opsiyalari
          onShowSizeChange={(current, size) => {
            setLimit(size); // Sahifa hajmini yangilash
            setCurrentPage(1); // Sahifani birinchi sahifaga qaytarish
          }}
          showQuickJumper // Sahifa raqamiga tezkor o'tish
        />
      </div>
    </div>
  );
};
