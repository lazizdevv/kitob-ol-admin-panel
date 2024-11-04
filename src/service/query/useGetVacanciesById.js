import React from 'react';
import { gatewayRequest } from "../../config/geteway-request";
import { useQuery } from "@tanstack/react-query";

export const useGetVacanciesById = (vacancyId) => {
    return useQuery({
        queryKey: ['vacancy', vacancyId], // Unique key for this query based on vacancyId
        queryFn: async () => {
            // Make a GET request to fetch vacancy details by ID
            const { data } = await gatewayRequest.get(`/vacancies/get?id=${vacancyId}`);
            return data;
        },
        enabled: !!vacancyId, // Query only runs if vacancyId exists
        onSuccess: (vacancy) => {
            console.log("Vacancy found:", vacancy);
        },
        onError: (error) => {
            console.error("Error fetching vacancy details:", error);
        },
    });
};
