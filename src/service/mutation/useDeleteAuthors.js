import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useDeleteAuthor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) =>
            gatewayRequest.delete(`/authors/delete?id=${id}`).then((res) => res.data),
        onSuccess: (res) => {
            console.log("Muallif muvaffaqiyatli o'chirildi:", res);
            // Mualliflar ro'yxatini yangilash
            queryClient.invalidateQueries("authorList"); // Mualliflar ro'yxatini yangilash
        },
        onError: (error) => {
            console.error("Muallifni o'chirishda xato:", error);
        },
    });
};
