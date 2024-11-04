


import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetCategories = (name = '', limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["getCategories", name, limit, offset], // Query key
        queryFn: async () => {
            const response = await gatewayRequest.get(`/categories/list?name=${name}&limit=${limit}&offset=${offset}`);
            return response.data; // Return the categories array from the response
        },
        onSuccess: (categories) => {
            console.log("Categories list:", categories); // Log categories on success
        },
        onError: (error) => {
            console.error("Error fetching categories:", error); // Log error on failure
        },
        // Retry configuration can be added here if necessary
    });
};