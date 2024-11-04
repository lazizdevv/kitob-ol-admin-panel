import React from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { Districts } from "../districts/districts";
import { Button, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { loadState } from "../../config/stroge";

export const CitiesDetail = () => {
  const { id } = useParams();
  const { data: category, isLoading, error } = useGetCitiesById(id);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const user = loadState("user");

  const backLink =
    user.role === "superadmin" ? `/super-admin/cities` : `/admin/cities`;

  return (
    <div className="max-w-screen-lg w-full mx-auto p-0 md:p-3">
      <div className="mb-5">
        <Link to={backLink}>
          <Tooltip title={"Ortga"}>
            <Button className="" type="primary" icon={<ArrowLeftOutlined />} />
          </Tooltip>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Batafsil Sahifa
      </h1>

      <div className="border rounded-lg p-6 shadow-primary shadow-md transition-shadow duration-300 bg-white">
        <div className="grid md:grid-cols-3 justify-center ">
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.uz || "N/A"}
          </h3>
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.en || "N/A"}
          </h3>
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.ru || "N/A"}
          </h3>
        </div>

        <Districts cityId={id} />
      </div>
    </div>
  );
};
