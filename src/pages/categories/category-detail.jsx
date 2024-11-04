import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCategoryById } from "../../service/query/useGetCAtegoryById"; // Kategoriyani ID bo'yicha olish uchun hook
import { Loading } from "../../components/loading/loading";
import { loadState } from "../../config/stroge";

export const CategoryDetailPage = () => {
  const { id } = useParams(); // URL dan id ni olish
  const { data: category, isLoading, error } = useGetCategoryById(id); // ID orqali kategoriya ma'lumotini olish

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log(category);

  const user = loadState("user");

  const updateLink =
    user.role === "superadmin"
      ? `/super-admin/categories-update/${category.id}`
      : `/admin/categories-update/${category.id}`;

  return (
    <div className="max-w-screen-lg w-full mx-auto p-0 md:p-3">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Batafsil Sahifa
      </h1>

      <div className="border rounded-lg p-6 shadow-primary shadow-md transition-shadow duration-300 bg-white">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {category.name.uz || "N/A"} {/* O'zbekcha nomni ko'rsatish */}
        </h3>

        {/* Tavsiflar */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">O'zbekcha Tavsif:</h4>
            <p className="text-gray-700">
              {category.description?.uz || "Tavsif mavjud emas"}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Inglizcha Tavsif:</h4>
            <p className="text-gray-700">
              {category.description?.en || "No description available"}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Ruscha Tavsif:</h4>
            <p className="text-gray-700">
              {category.description?.ru || "Описание отсутствует"}
            </p>
          </div>
        </div>

        {/* Tahrirlash tugmasi */}
        <div className="flex justify-center mt-8">
          <Link
            to={updateLink} // Tahrirlash sahifasiga yo'naltirish
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Tahrirlash
          </Link>
        </div>
      </div>
    </div>
  );
};
