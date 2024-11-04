import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetBooksById = (book_id) => {
    return useQuery({
        queryKey: ["getBooksById", book_id],
        queryFn: async () => {
            const response = await gatewayRequest.get(`/books/get?book_id=${book_id}`);
            return response.data;
        },
        enabled: !!book_id,
        onSuccess: (book) => {
            console.log("Kitob topildi:", book);
        },
        onError: (error) => {
            console.error("Kitobni olishda xatolik yuz berdi:", error.response?.data?.message || error.message);
        }
    });
};
