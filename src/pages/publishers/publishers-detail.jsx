import React from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { Button, Card, Col, Flex, List, Row } from "antd";
import { useGetById } from "../../service/query/useGetById";
import {
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ArrowLeftOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  citiesEndPoints,
  districtsEndPoints,
  publishersEndPoints,
} from "../../config/endpoints";

export const PublisherDetail = () => {
  const { id } = useParams();
  const {
    data: publisher,
    isLoading,
    error,
  } = useGetById(publishersEndPoints.get, id);

  const byCity = publisher?.location?.city_id;
  const byDistrict = publisher?.location?.district_id;
  const { data: publisherCity } = useGetById(citiesEndPoints.get, byCity);
  const { data: publisherDistrict } = useGetById(
    districtsEndPoints.get,
    byDistrict
  );

  const getCityAndDistrictName = (city_id, district_id) => {
    const { data: cityData, isLoading } = useGetById(
      citiesEndPoints.get,
      city_id
    );
    const { data: districtData } = useGetById(
      districtsEndPoints.get,
      district_id
    );
    if (isLoading) return "Yuklanmoqda...";
    return `${cityData?.name.uz}: ${districtData?.name.uz}`;
  };

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const backLink = `/admin/publishers`;

  return (
    <Flex className="p-1" vertical>
      <div className="mb-5 border w-fit">
        <Link to={backLink}>
          <Button className="" type="primary" icon={<ArrowLeftOutlined />}>
            ortga
          </Button>
        </Link>
      </div>
      <Row className="" gutter={[30, 30]}>
        <Col xs={24} md={12}>
          <Card
            className="bg-accent p-3"
            hoverable
            cover={
              <img
                alt={publisher.name}
                src={publisher.image_url}
                className="border-2 border-dark max-h-80 object-contain w-full"
              />
            }
          >
            <Flex vertical gap={24} wrap justify="space-between" className="">
              <h1>
                <UserOutlined /> {publisher.name}
              </h1>
              <h2>
                <SendOutlined /> {publisher.email}
              </h2>
              <p>
                <PhoneOutlined /> {publisher.phone_number}
              </p>
              <b>
                <EnvironmentOutlined /> {publisherCity?.name.uz}:
                {publisherDistrict?.name.uz}
              </b>
            </Flex>
          </Card>
        </Col>

        <Col className="w-full  max-w-xl">
          <Card className="bg-accent w-full" title="Qo'shimcha ma'lumotlar">
            <List
              className="mb-5 hover:shadow-md"
              header={<b>Tel nomerlar:</b>}
              bordered
              dataSource={publisher.phone_numbers}
              renderItem={(item) => (
                <List.Item>
                  <PhoneOutlined /> {item.phone_number}
                </List.Item>
              )}
            />
            <List
              className="mb-5 hover:shadow-md w-full"
              header={<b>Manzillar:</b>}
              bordered
              dataSource={publisher.locations}
              renderItem={(item) => (
                <List.Item>
                  <EnvironmentOutlined />{" "}
                  {getCityAndDistrictName(item.city_id, item.district_id)}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
