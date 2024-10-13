import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetAllAdmin = (limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["getAllAdmin", limit, offset], // queryKey ga limit va offset qo'shildi
        queryFn: () =>
            request.get(`/auth/admin/user/get/all?limit=${limit}&offset=${offset}`).then((res) => res.data),
        onSuccess: (res) => {
            console.log("Adminlar ro‘yxati:", res);
        },
        onError: (error) => {
            console.error("Adminlarni olishda xatolik yuz berdi:", error);
        },
    });
};
