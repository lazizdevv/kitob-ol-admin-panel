import React from "react";
import { useGetProfile } from "../../service/query/useGetProfile";
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "../../components/profile-card/profile-card";
import { Loading } from "../../components/loading/loading";
import { loadState } from "../../config/stroge";
import { Button, Flex, Typography } from "antd";
import { EditFilled } from "@ant-design/icons";

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetProfile();
  const navigate = useNavigate();
  const role = loadState("user");

  if (isLoading) return <Loading />;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const updateLink =
    role.role === "superadmin"
      ? `/super-admin/update-profile`
      : `/admin/update-profile`;

  const useUpdatePasswordLink =
    role.role === "superadmin"
      ? `/super-admin/update-password`
      : `/admin/update-password`;

  return (
    <Flex vertical align="center" justify="center" className="h-full">
      <Typography.Title level={2} className="text-center md:hidden">
        Profil
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
