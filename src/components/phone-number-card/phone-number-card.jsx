import React, { useState } from "react";

export const PhoneNumberInput = ({ value, onChange }) => {
  const [countryCode, setCountryCode] = useState("+998");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Faqat raqamlarni qabul qilish
    if (/^[0-9]*$/.test(inputValue) || inputValue === "") {
      onChange(countryCode + inputValue);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    setCountryCode(selectedCode);

    // Foydalanuvchi o'zgartirgan raqamni saqlash
    const currentNumber = value.replace(/^\+\d{1,3}/, ""); // Hozirgi raqamdan kodni olib tashlash
    onChange(selectedCode + currentNumber); // Yangi kod bilan raqamni yangilash
  };

  return (
    <div>
      <label className="font-medium">Telefon raqam:</label>
      <div className="flex items-center">
        <select
          value={countryCode}
          onChange={handleCountryChange}
          className="border border-gray-300 p-2 rounded-md mr-2"
        >
          <option value="+998">O'zbekiston (+998)</option>
          {/* Boshqa davlatlarni qo'shishingiz mumkin */}
          <option value="+7">Rossiya (+7)</option>
        </select>
        <input
          type="text"
          name="phone_number"
          value={value.replace(countryCode, "")} // Kodni ko'rsatmaslik
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
          maxLength={9} // Faqat raqamlar
          placeholder="_ _ _ _ _ _ _ _" // Joyni ko'rsatish
        />
      </div>
    </div>
  );
};
