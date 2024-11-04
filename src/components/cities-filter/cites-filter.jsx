import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { loadState } from "../../config/stroge";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { CitiesCard } from "../cities-card/cities-card";
import { useGetCitiesList } from "../../service/query/useGetCitiesList";
import { SearchOutlined } from "@ant-design/icons";

export const CitiesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useGetCitiesList(debouncedSearchTerm);

  if (error) return <div>Xatolik yuz berdi</div>;

  console.log(data);

  const role = loadState("user");

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/create-cities`
      : `/admin/create-cities`;

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-10">
        <div className="w-fit">
          <Link to={detailLink}>
            <Button type="primary" className="w-full max-w-96 p-5">
              Shahar Yaratish
            </Button>
          </Link>
        </div>
        <div className="flex items-center w-full max-w-screen-sm justify-end ">
          <Input
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Shaharni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 rounded p-2 mb-4 w-full max-w-screen-sm focus:outline-dark border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden">
        {" "}
        {isLoading ? (
          <div className="col-span-3 text-center text-gray-500 font-semibold">
            Yuklanmoqda...
          </div>
        ) : debouncedSearchTerm && data?.Count > 0 ? (
          data.Cities?.cities.map((category) => (
            <CitiesCard key={category.id} category={category} />
          ))
        ) : (
          debouncedSearchTerm && (
            <div className="col-span-3 text-center text-red-500 font-semibold">
              Hech qanday kategoriya topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
