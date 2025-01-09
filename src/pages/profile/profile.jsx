import React from "react";
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "../../components/profile/profile-card";
import { Button, Flex, Spin, Typography } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { adminEndPoints } from "../../config/endpoints";

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetList(
    adminEndPoints.profile,
    {},
    false
  );
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Flex justify="center" align="center" className="h-full">
        <Spin />
      </Flex>
    );
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const updateLink = `/admin/update-profile`;
  const useUpdatePasswordLink = `/admin/update-password`;

  return (
    <Flex vertical align="center" justify="center" className="h-full">
      <Typography.Title level={2} className="text-center md:hidden">
        Profile
      </Typography.Title>

      <ProfileCard {...data} />

      <Flex justify="center" align="center" gap={20} className="mt-5">
        <Button
          size="middle"
          icon={<EditFilled />}
          type="primary"
          onClick={() => navigate(useUpdatePasswordLink)}
        >
          Parolni Yangilash
        </Button>
        <Button
          icon={<EditFilled />}
          type="primary"
          onClick={() => navigate(updateLink)}
          size="middle"
        >
          Profile Tahrirlash
        </Button>
      </Flex>
    </Flex>
  );
};
