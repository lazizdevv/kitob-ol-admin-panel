import React, { useState } from "react";

export const formatPhoneNumber = (phone) => {
  if (!phone) return "Ma'lumot yo'q";
  // Telefon raqamini to'g'ri formatda ko'rsatish
  return phone.replace(
    /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
    "$1 $2-$3-$4-$5"
  );
};

export const ProfileCard = ({
  date_of_birth,
  email,
  first_name,
  last_name,
  phone_number,
  image_url,
  role,
}) => {
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopyPhoneNumber = () => {
    navigator.clipboard
      .writeText(phone_number)
      .then(() => {
        setCopyMessage("Nusxalandi!");
        setTimeout(() => setCopyMessage(""), 1000); // 2 soniyadan so'ng xabarni tozalash
      })
      .catch(() => {
        setCopyMessage("Nusxalashda xatolik yuz berdi.");
      });
  };

  return (
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
        <div className="flex gap-3 items-center border p-3 relative">
          {" "}
          {/* Relative positioning added */}
          <label className="font-medium">Telefon raqam:</label>
          <div className="flex items-center  justify-between">
            {/* Flex container for spacing */}
            <p className="text-gray-700">{formatPhoneNumber(phone_number)}</p>
          </div>
          <button
            onClick={handleCopyPhoneNumber}
            className={`p-1 font-medium text-sm rounded-md transition-all absolute top-1 right-1 ${
              copyMessage ? "bg-green-500 text-white" : "bg-blue-500 text-white"
            } `}
          >
            {copyMessage || "Nusxalash"}
          </button>
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
      {/* 
      {copyMessage && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
          {copyMessage}
        </div>
      )} */}
    </div>
  );
};
