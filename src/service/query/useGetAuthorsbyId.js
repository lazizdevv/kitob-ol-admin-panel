import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

// Muallif ID bo'yicha olish uchun hook
export const useGetAuthorsById = (id) => {
    return useQuery({
        queryKey: ["getAuthorsById", id], // queryKey ga ID qo'shildi
        queryFn: () =>
            gatewayRequest.get(`/authors/get?id=${id}`).then((res) => res.data), // ID bo'yicha muallifni olish
        enabled: !!id, // id mavjud bo'lsa so'rov yuboriladi
        onSuccess: (author) => {
            console.log("Muallif topildi:", author);
        },
        onError: (error) => {
            console.error("Muallifni olishda xatolik yuz berdi:", error);
        },
    });
};
