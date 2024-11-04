import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetVacanciesById } from "../../service/query/useGetVacanciesById";
import { useGetPublisherById } from "../../service/query/useGetPublisherById";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { useGetDistrictsById } from "../../service/query/useGetDistrictsById";
import { Card, Spin, Typography, Divider, Button } from "antd";

const { Title, Text } = Typography;

export const VacanciesDetail = () => {
  const navigate = useNavigate();
  const { id: vacancyId } = useParams();
  const language = "en"; // set the language you want to display, e.g., 'en', 'ru', 'uz'

  const {
    data: vacancy,
    isLoading: loadingVacancy,
    isError: errorVacancy,
  } = useGetVacanciesById(vacancyId);

  const {
    data: publisher,
    isLoading: loadingPublisher,
    isError: errorPublisher,
  } = useGetPublisherById(vacancy?.publisher_id || null);

  const {
    data: city,
    isLoading: loadingCity,
    isError: errorCity,
  } = useGetCitiesById(vacancy?.location?.city_id || null);

  const {
    data: district,
    isLoading: loadingDistrict,
    isError: errorDistrict,
  } = useGetDistrictsById(vacancy?.location?.district_id || null);

  // Combine loading states
  if (loadingVacancy || loadingPublisher || loadingCity || loadingDistrict) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Combine error states
  if (errorVacancy || errorPublisher || errorCity || errorDistrict) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text type="danger">
          Failed to load details. Please try again later.
        </Text>
      </div>
    );
  }

  return (
    <Card
      title={<Title level={3}>{vacancy?.title || "No title available"}</Title>}
      className="p-6 max-w-md mx-auto shadow-lg"
      bordered={true}
    >
      {/* <Divider /> */}
      <Text strong>Description: </Text>
      <Text>{vacancy?.description || "No description available"}</Text>
      <Divider />
      <Text strong>Salary: </Text>
      <Text>{`${vacancy.salary_from || 0} - ${
        vacancy.salary_to || 0
      } UZS`}</Text>
      <Divider />
      <Text strong>Location: </Text>
      <Text>
        {city?.name?.[language] || "N/A"}, {district?.name?.[language] || "N/A"}
      </Text>
      <Divider />
      <Text strong>Phone: </Text>
      <Text>{vacancy.phone_number || "No contact information"}</Text>
      <Divider />
      <Text strong>Working Styles: </Text>
      <Text>{vacancy.working_styles || "N/A"}</Text>
      <Divider />
      <Text strong>Working Types: </Text>
      <Text>{vacancy.working_types || "N/A"}</Text>
      <Divider />
      <Text strong>View Count: </Text>
      <Text>{vacancy.view_count || 0}</Text>
      <Divider />
      <Text strong>Status: </Text>
      <Text>{vacancy.status || "N/A"}</Text>
      <Divider />
      {/* <Text strong>Publisher ID: </Text>
      <Text>{vacancy.publisher_id || "N/A"}</Text> */}
      {/* <Divider /> */}
      <Text strong>Publisher Name: </Text>
      <Text>{publisher?.name || "N/A"}</Text>
      <Divider />
      <Text strong>Created At: </Text>
      <Text>{vacancy.created_at || "N/A"}</Text>

      <div>
        <Button onClick={() => navigate(-1)} type="primary" className="mt-4">
          Orqaga
        </Button>
      </div>
    </Card>
  );
};
