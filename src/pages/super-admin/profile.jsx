import React from "react";
import { useGetProfile } from "../../service/query/useGetProfile"; // Profil ma'lumotlarini olish hooki
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "../../components/profile-card/profile-card";

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetProfile();
  const navigate = useNavigate();

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>

      <ProfileCard {...data} />

      <div className="mt-6 text-center">
        <button
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-1/3"
          onClick={() => navigate("/super-admin/update-profile")}
        >
          Profilni yangilash
        </button>
      </div>
    </>
  );
};
