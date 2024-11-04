import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetAuthors = (name = '', limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["getAuthors", name, limit, offset], // Query key for caching
        queryFn: async () => {
            // Fetch authors from the API
            const response = await gatewayRequest.get(`/authors/list?name=${name}&limit=${limit}&offset=${offset}`);
            return response.data; // Make sure response.data has the expected structure
        },
        onSuccess: (data) => {
            console.log("Authors list:", data); // Log authors on success
            // Make sure to inspect the data structure here
        },
        onError: (error) => {
            console.error("Error fetching authors:", error); // Log error on failure
        },
        // Retry configuration can be added here if necessary
    });
};
