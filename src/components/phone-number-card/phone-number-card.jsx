import React, { useState, useEffect } from "react";

export const PhoneNumberInput = ({ value, onChange }) => {
  const [countryCode, setCountryCode] = useState("+998");
  const [displayValue, setDisplayValue] = useState("");

  // Hozirgi raqamni formatlash
  useEffect(() => {
    const currentNumber = value.replace(/^\+\d{1,3}/, ""); // Hozirgi raqamdan kodni olib tashlash
    setDisplayValue(formatPhoneNumber(currentNumber)); // Formatlangan raqamni o'rnatish
  }, [value]);

  // Raqamni formatlash funktsiyasi
  const formatPhoneNumber = (number) => {
    if (number.length === 0) return "";
    if (number.length <= 3) return number; // 3 ta raqamdan kam bo'lsa, o'zgarishsiz ko'rsatish
    if (number.length <= 5) return `${number.slice(0, 2)}-${number.slice(2)}`; // 3-5 raqamlar uchun format
    if (number.length <= 7) return `${number.slice(0, 2)}-${number.slice(2, 5)}-${number.slice(5)}`; // 5-7 raqamlar uchun format
    return `${number.slice(0, 2)}-${number.slice(2, 5)}-${number.slice(5, 7)}-${number.slice(7, 9)}`; // 9 ta raqam uchun to'liq format
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Faqat raqamlarni qabul qilish
    setDisplayValue(formatPhoneNumber(inputValue)); // Formatlangan raqamni ko'rsatish
    onChange(countryCode + inputValue); // Saqlash uchun kod bilan birga raqam
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
          <option value="+998">Uzb (+998)</option>
          <option value="+7">Rus (+7)</option>
          {/* Boshqa davlatlarni qo'shishingiz mumkin */}
        </select>
        <input
          type="text"
          name="phone_number"
          value={displayValue} // Formatlangan raqam ko'rsatiladi
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
          placeholder="_ _ _ _ _ _ _ _" // Joyni ko'rsatish
        />
      </div>
    </div>
  );
};
