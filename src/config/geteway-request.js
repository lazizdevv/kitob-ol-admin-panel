import axios from "axios";
import { loadState } from "./stroge"; // `loadState` funksiyasining importi

const gatewayRequest = axios.create({ baseURL: "https://gateway.axadjonovsardorbek.uz" }); // Obyekt nomini o'zgartirdik

// So'rov yuborilganda tokenni qo'shish
gatewayRequest.interceptors.request.use((config) => {
  const token = loadState("user")?.access_token; // Tokenni local storage'dan olish
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Tokenni sarlavhaga qo'shish
  }
  return config; // Yangilangan config ni qaytarish
});

// So'rov javobini boshqarish
gatewayRequest.interceptors.response.use(
  (res) => res, // Muvaffaqiyatli javobni qaytarish
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user"); // Tokenni o'chirish
      window.location.href = "/"; // Foydalanuvchini login sahifasiga yo'naltirish
    }
    return Promise.reject(error); // Xatolikni qaytarish
  }
);

export { gatewayRequest }; // Yangi obyektni eksport qilish
