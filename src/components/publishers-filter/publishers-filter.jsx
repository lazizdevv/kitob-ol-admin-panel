import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetPublishersList } from "../../service/query/useGetPublishersList";
import { PublisherCard } from "../publishers-card/publishers-card";

export const PublishersFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetPublishersList(debouncedSearchTerm);

  if (error) return <div>Xatolik yuz berdi</div>;

  console.log(data);

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-end gap-10">
        <div className="flex items-center w-full max-w-screen-sm justify-center ">
          <Input
            suffix={<SearchOutlined />}
            type="text"
            placeholder="nashriyotchini va do'konni qidiring"
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
        ) : debouncedSearchTerm && data?.count > 0 ? (
          data.publishers?.map((publisher) => (
            <PublisherCard key={publisher.id} publisher={publisher} />
          ))
        ) : (
          debouncedSearchTerm && (
            <div className="col-span-3 text-center text-red-500 font-semibold">
              Hech qanday malumot topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
