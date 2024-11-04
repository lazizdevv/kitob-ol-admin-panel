import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

// Kategoriya ID bo'yicha olish uchun hook
export const useGetCategoryById = (id) => {
    return useQuery({
        queryKey: ["getCategoryById", id], // queryKey ga ID qo'shildi
        queryFn: () =>
            gatewayRequest.get(`/categories/get?id=${id}`).then((res) => res.data), // ID bo'yicha kategoriyani olish
        enabled: !!id, // id mavjud bo'lsa so'rov yuboriladi
        onSuccess: (category) => {
            console.log("Kategoriya topildi:", category);
        },
        onError: (error) => {
            console.error("Kategoriyani olishda xatolik yuz berdi:", error);
        },
    });
};
