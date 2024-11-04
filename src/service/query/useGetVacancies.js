import React from "react";
import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

// Custom hook to fetch vacancies with optional filters
export const useGetVacancies = ({
    title = '',               // Title filter for the vacancy
    working_styles = '',      // Working styles filter
    working_types = '',       // Working types filter
    salary_from = null,       // Minimum salary filter
    salary_to = null,         // Maximum salary filter
    status = '',              // Vacancy status filter
    publisher_id = null,      // Publisher ID filter
    city_id = '',             // City ID filter
    district_id = null,       // District ID filter
    limit = 10,               // Limit for pagination (number of items per page)
    offset = 0,               // Offset for pagination (starting index for current page)
} = {}) => {
    return useQuery({
        // Unique query key with all filter parameters for caching and tracking
        queryKey: [
            "getVacancies",
            title,
            working_styles,
            working_types,
            salary_from,
            salary_to,
            status,
            publisher_id,
            city_id,
            district_id,
            limit,
            offset,
        ],
        queryFn: async () => {
            // Constructing query parameters conditionally, excluding empty or null fields
            const params = {
                ...(title && { title }),
                ...(working_styles && { working_styles }),
                ...(working_types && { working_types }),
                ...(salary_from !== null && { salary_from }),
                ...(salary_to !== null && { salary_to }),
                ...(status && { status }),
                ...(publisher_id !== null && { publisher_id }),
                ...(city_id && { city_id }),
                ...(district_id !== null && { district_id }),
                ...(limit && { limit }),
                ...(offset && { offset }),
            };

            console.log("Request parameters:", params); // Log parameters for debugging

            // Making API request with the constructed parameters
            const response = await gatewayRequest.get("/vacancies/list", { params });
            return response.data; // Return data from response
        },
        onSuccess: (data) => {
            console.log("Vacancies data:", data); // Log data on success
        },
        onError: (error) => {
            console.error("Error fetching vacancies:", error?.response?.data || error); // Log error if request fails
        },
    });
};
