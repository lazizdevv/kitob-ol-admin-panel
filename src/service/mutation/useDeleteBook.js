import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../config/request";
import { toast } from "react-toastify";

export const useDeleteBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) =>
            request.delete(`/auth/admin/book/delete?id=${id}`).then((res) => res.data), // URL updated
        onSuccess: (res) => {
            toast.success("Kitob muvaffaqiyatli o'chirildi");
            console.log("Kitob muvaffaqiyatli o'chirildi:", res);
            queryClient.invalidateQueries("bookList"); // Update the book list
        },
        onError: (error) => {
            console.error("Kitobni o'chirishda xato:", error);
            toast.error(error?.response?.data?.message || "Kitobni o'chirishda xato yuz berdi!");
        },
    });
};
