import React from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { loadState } from "../../config/stroge";
import { useGetPublisherById } from "../../service/query/useGetPublisherById";
import { Button, Card, Col, List, Row, Tooltip } from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ArrowLeftOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
// import { useGetDistrictsById } from "../../service/query/useGetDistrictsbyId";
import { useGetDistrictsById } from "../../service/query/useGetDistrictsById";


export const PublisherDetail = () => {
  const { id } = useParams();
  const { data: publisher, isLoading, error } = useGetPublisherById(id);

  const byCity = publisher?.location?.city_id;
  const byDistrict = publisher?.location?.district_id;
  const { data: publisherCity } = useGetCitiesById(byCity);
  const { data: publisherDistrict } = useGetDistrictsById(byDistrict);

  const user = loadState("user");
  const getCityAndDistrictName = (city_id, district_id) => {
    const { data: cityData, isLoading } = useGetCitiesById(city_id);
    const { data: districtData } = useGetDistrictsById(district_id);
    if (isLoading) return "Yuklanmoqda...";
    return `${cityData?.name.uz}: ${districtData?.name.uz}`;
  };

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log(publisherCity);
  console.log(publisher);

  const backLink =
    user.role === "superadmin"
      ? `/super-admin/publishers`
      : `/admin/publishers`;

  return (
    <>
      <div className="mb-5">
        <Link to={backLink}>
          <Tooltip title={"Ortga"}>
            <Button className="" type="primary" icon={<ArrowLeftOutlined />} />
          </Tooltip>
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
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            }
          >
            <div className="flex flex-col gap-5 justify-between flex-wrap">
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
            </div>
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
    </>
  );
};
