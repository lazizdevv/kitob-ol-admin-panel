import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { loadState } from "../../config/stroge";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetDistrictsList } from "../../service/query/useGetDistrictsList";
import { DistrictsCard } from "../districts-card/districts-card";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

export const DistrictFilter = ({ cityId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useGetDistrictsList(
    debouncedSearchTerm,
    cityId
  );

  if (error) return <div>Xatolik yuz berdi</div>;

  console.log(data);

  const user = loadState("user");

  const addDistrictsLink =
    user.role === "superadmin"
      ? `/super-admin/create-district/${cityId}`
      : `/admin/create-district/${cityId}`;

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-10">
        <div className="w-fit">
          <Link to={addDistrictsLink}>
            <Button
              icon={<PlusCircleOutlined />}
              type="primary"
              className="w-full max-w-96 p-5"
            >
              Tuman Qo'shish
            </Button>
          </Link>
        </div>
        <div className="flex items-center w-full max-w-screen-sm justify-end ">
          <Input
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tumanni qidiring"
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
          data.Districts?.districts.map((category) => (
            <DistrictsCard key={category.id} category={category} />
          ))
        ) : (
          debouncedSearchTerm && (
            <div className="col-span-3 text-center text-red-500 font-semibold">
              Hech qanday tuman topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
