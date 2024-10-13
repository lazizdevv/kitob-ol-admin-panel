import React from "react";

export const ProfileCard = ({
  date_of_birth,
  email,
  first_name,
  last_name,
  phone_number,
  image_url,
  role,
}) => {

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="flex flex-col gap-5 items-center space-x-4 mb-6 ">
          <img
            src={image_url || "https://via.placeholder.com/128"}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full hover:scale-110 transition-all border-4 border-red-900 cursor-zoom-in"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {first_name} {last_name}
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 items-center border p-3">
            <label className="font-medium">Roli:</label>
            <p className="text-gray-700">{role}</p>
          </div>
          <div className="flex gap-3 items-center border p-3">
            <label className="font-medium">Telefon raqam:</label>
            <p className="text-gray-700">{phone_number || "Ma'lumot yo'q"}</p>
          </div>
          <div className="flex gap-3 items-center border p-3">
            <label className="font-medium">Email:</label>
            <p className="text-gray-700">{email || "Ma'lumot yo'q"}</p>
          </div>
          <div className="flex gap-3 items-center border p-3">
            <label className="font-medium">Tug'ilgan sana:</label>
            <p className="text-gray-700">{date_of_birth || "Ma'lumot yo'q"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
