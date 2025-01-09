import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Flex, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetById } from "../../service/query/useGetById";
import { categoriesEndPoints } from "../../config/endpoints";

export const CategoryDetailPage = () => {
  const { id } = useParams();
  const {
    data: category,
    isLoading,
    error,
  } = useGetById(categoriesEndPoints.get, id);

  if (isLoading) return <Spin />;
  if (error) return <div>{error.message}</div>;

  return (
    <Flex vertical className="w-full p-0 md:p-3">
      <div className="border rounded-lg p-4 shadow-dark shadow-md transition-shadow duration-300 bg-white max-w-screen-lg mx-auto w-full">
        <Flex vertical gap={12}>
          <Link to={`/admin/categories`}>
            <Button icon={<ArrowLeftOutlined />} type="primary">
              ortga
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center mb-6 text-black">
            Batafsil Sahifa
          </h1>
        </Flex>

        <Flex
          gap={12}
          justify="space-around"
          className="flex-wrap md:flex-nowrap mb-4"
        >
          <h3 className="text-xl border-2 rounded-md p-1 md:p-3 w-full font-semibold text-gray-800">
            {category.name.uz || "N/A"}
          </h3>
          <h3 className="text-xl border-2 rounded-md p-1 md:p-3 w-full font-semibold text-gray-800">
            {category.name.en || "N/A"}
          </h3>
          <h3 className="text-xl border-2 rounded-md p-1 md:p-3 w-full font-semibold text-gray-800">
            {category.name.ru || "N/A"}
          </h3>
        </Flex>

        <Flex vertical gap={24}>
          <div className="border-2 p-2 rounded-md">
            <h4 className="font-medium text-gray-900">O'zbekcha Tavsif:</h4>
            <p className="text-gray-700">
              {category.description?.uz || "Tavsif mavjud emas"}
            </p>
          </div>
          <div className="border-2 p-2 rounded-md">
            <h4 className="font-medium text-gray-900">Inglizcha Tavsif:</h4>
            <p className="text-gray-700">
              {category.description?.en || "No description available"}
            </p>
          </div>
          <div className="border-2 p-2 rounded-md">
            <h4 className="font-medium text-gray-900">Ruscha Tavsif:</h4>
            <p className="text-gray-700">
              {category.description?.ru || "Описание отсутствует"}
            </p>
          </div>
        </Flex>

        <Flex justify="center" className="mt-8">
          <Link to={`/admin/categories-update/${category.id}`}>
            <Button size="large" type="primary">
              Tahrirlash
            </Button>
          </Link>
        </Flex>
      </div>
    </Flex>
  );
};
