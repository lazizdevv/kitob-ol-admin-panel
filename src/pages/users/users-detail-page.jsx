import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileCard } from "../../components/profile/profile-card";
import { Loading } from "../../components/loading/loading";
import { Button, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetById } from "../../service/query/useGetById";
import { usersEndPoints } from "../../config/endpoints";

export const AdminDetailPage = () => {
  const { id } = useParams();
  const {
    data: admin,
    isLoading,
    error,
  } = useGetById(usersEndPoints.get, id, false);
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <Flex vertical gap={24}>
      <Flex>
        <Button
          onClick={() => navigate(-1)}
          type="primary"
          icon={<ArrowLeftOutlined />}
        >
          Orqaga
        </Button>
      </Flex>
      <ProfileCard {...admin} />
    </Flex>
  );
};
