import React from "react";
import { useParams } from "react-router-dom";
import { useGetAdminById } from "../../service/query/useGetUsersById";
import { ProfileCard } from "../../components/profile-card/profile-card";
import { Loading } from "../../components/loading/loading";

export const AdminDetailPage = () => {
  const { id } = useParams(); // URL dan id ni olish
  const { data: admin, isLoading, error } = useGetAdminById(id); // ID orqali adminni olish

  if (isLoading) return <Loading/>
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">{admin.role} detail page</h1>

      <ProfileCard {...admin} />
    </>
  );
};
