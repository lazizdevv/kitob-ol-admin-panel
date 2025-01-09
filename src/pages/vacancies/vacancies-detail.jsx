import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Typography, Divider, Button, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetById } from "../../service/query/useGetById";
import { vacanciesEndPoints } from "../../config/endpoints";

const { Title, Text } = Typography;

export const VacanciesDetail = () => {
  const navigate = useNavigate();
  const { id: vacancyId } = useParams();

  const { data, isLoading, isError } = useGetById(
    vacanciesEndPoints.get,
    vacancyId
  );

  if (isLoading) {
    return (
      <Flex justify="center" align="center" className="h-screen">
        <Spin size="large" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" className="h-screen">
        <Text type="danger">
          Tafsilotlarni yuklashda xatolik yuz berdi. Qayta urinib ko'ring.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex vertical align="center" justify="center" gap={24}>
      <Flex className="w-full">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/vacancies")}
          type="primary"
          className="mt-4"
        >
          ortga
        </Button>
      </Flex>
      <Card
        title={
          <Title className="border-2 text-center rounded" level={3}>
            {data?.title || "Mavjud emas"}
          </Title>
        }
        className="max-w-2xl w-full shadow-md shadow-dark"
        bordered={true}
      >
        <Text strong>Ta'rif: </Text>
        <Text>{data?.description || "Mavjud emas"}</Text>
        <Divider />
        <Text strong>Oylik: </Text>
        <Text>{`${data.salary_from || 0} - ${data.salary_to || 0} UZS`}</Text>
        <Divider />
        <Text strong>Joylashuv: </Text>
        <Text>
          {data.city_name?.uz || "Mavjud emas"},{" "}
          {data.district_name?.uz || "Mavjud emas"}
        </Text>
        <Divider />
        <Text strong>Telefon: </Text>
        <Text>{data.phone_number || "Aloqa ma'lumoti yo'q"}</Text>
        <Divider />
        <Text strong>Ish turi: </Text>
        <Text>{data.working_styles || "Mavjud emas"}</Text>
        <Divider />
        <Text strong>Ish sharoitlari: </Text>
        <Text>{data.working_types || "Mavjud emas"}</Text>
        <Divider />
        <Text strong>Ko'rishlar soni: </Text>
        <Text>{data.view_count || 0}</Text>
        <Divider />
        <Text strong>Holat: </Text>
        <Text>{data.status || "Mavjud emas"}</Text>
        <Divider />
        <Text strong>Chop etuvchi: </Text>
        <Text>{data.publisher_name || "Mavjud emas"}</Text>
        <Divider />
        <Text strong>Yaratilgan vaqti: </Text>
        <Text>{data.created_at || "Mavjud emas"}</Text>
      </Card>
    </Flex>
  );
};
