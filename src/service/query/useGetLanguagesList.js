import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetLanguagesList = (name = "", limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ["getLanguages", name, limit, offset], // Query key
    queryFn: async () => {
      const response = await gatewayRequest.get(
        `/languages/list?name=${name}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    },
    onSuccess: (languages) => {
      console.log("languages list:", languages);
    },
    onError: (error) => {
      console.error("Error fetching languages:", error);
    },
  });
};
