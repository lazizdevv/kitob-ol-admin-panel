import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

// Adminni ID bo'yicha olish uchun hook
export const useGetAdminById = (id) => {
    return useQuery({
        queryKey: ["getAdminById", id], // queryKey ga ID qo'shildi
        queryFn: () =>
            request.get(`/auth/admin/user/get?id=${id}`).then((res) => res.data), // ID bo'yicha adminni olish
        enabled: !!id, // id mavjud bo'lsa so'rov yuboriladi
        onSuccess: (admin) => {
            console.log("Admin topildi:", admin);
        },
        onError: (error) => {
            console.error("Adminni olishda xatolik yuz berdi:", error);
        },
    });
};
