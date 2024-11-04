import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetAuthors = (name = '', limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["getAuthors", name, limit, offset], // Query key
        queryFn: async () => {
            const response = await gatewayRequest.get(`/authors/list?name=${name}&limit=${limit}&offset=${offset}`);
            return response.data; // Return the authors array from the response
        },
        onSuccess: (authors) => {
            console.log("Authors list:", authors); // Log authors on success
        },
        onError: (error) => {
            console.error("Error fetching authors:", error); // Log error on failure
        },
        // Retry configuration can be added here if necessary
    });
};
