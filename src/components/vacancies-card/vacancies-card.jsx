import React from "react";
import { Button, Tooltip } from "antd";
import {
  DollarOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { useGetDistrictsById } from "../../service/query/useGetDistrictsById";

export const VacancyCard = ({ vacancy }) => {
  // Load the user role from local storage
  const role = loadState("user");

  // Get the vacancy ID from the vacancy prop
  const vacancyId = vacancy.id; // Ensure vacancy has an ID

  // Define the detail link based on the user's role
  const detailLink =
    role?.role === "superadmin"
      ? `/super-admin/vacancies-detail/${vacancyId}`
      : `/admin/vacancies-detail/${vacancyId}`;

  // Fetch city and district data by ID using custom hooks
  const { data: cityData } = useGetCitiesById(vacancy.location?.city_id);
  const { data: districtData } = useGetDistrictsById(
    vacancy.location?.district_id
  );

  return (
    <div className="border-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="vacancy-card w-full p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        {/* Vacancy Title */}
        <div className="flex gap-3 items-center">
          <h2 className="text-lg font-semibold">
            {vacancy.title || "No title"}
          </h2>
        </div>

        {/* Salary Range */}
        <p className="text-blue-600 font-medium">
          <DollarOutlined /> {vacancy.salary_from || "N/A"} -{" "}
          {vacancy.salary_to || "N/A"} UZS
        </p>

        {/* Working Types */}
        <p className="border border-primary p-1 rounded-md font-medium">
          {vacancy.working_types || "N/A"}
        </p>

        {/* Phone Number */}
        <p className="flex items-center gap-2">
          <PhoneOutlined /> {vacancy.phone_number || "No contact"}
        </p>

        {/* Location */}
        <p className="text-gray-500">
          {cityData ? cityData.name.en : "City N/A"},{" "}
          {districtData ? districtData.name.en : "District N/A"}
        </p>

        {/* Detail Link */}
        <div className="flex gap-2">
          <Tooltip title="Batafsil ko'rish">
            <Link to={detailLink}>
              <Button
                className="bg-blue-500 text-white"
                icon={<InfoCircleOutlined />}
                type="primary"
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
