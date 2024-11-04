import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useCreateAuthors = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newAuthor) => {
            return gatewayRequest.post('/authors/create', newAuthor);
        },
        onSuccess: () => {
            // Authors list cache invalidation
            queryClient.invalidateQueries(["getAuthors"]);
            console.log("Author successfully created");
        },
        onError: (error) => {
            console.error("Error creating author:", error);
        },
    });
};
