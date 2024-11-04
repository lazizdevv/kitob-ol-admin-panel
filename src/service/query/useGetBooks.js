import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetBooks = ({
  limit = 10,
  offset = 0,
  price_from = null,
  price_to = null,
  publisher_id = '',
  category_id = '',
  translator_id = '',
  author_id = '',
  language_id = '',
  city_id = '',
  district_id = '',
  title = '',
  writing_type = '',
  status = '',
  is_new = null, // default qiymati null
} = {}) => {
  return useQuery({
    queryKey: [
      "getBooks",
      limit,
      offset,
      price_from,
      price_to,
      publisher_id,
      category_id,
      translator_id,
      author_id,
      language_id,
      city_id,
      district_id,
      title,
      writing_type,
      status,
      is_new,
    ],
    queryFn: async () => {
      // Parametrlarni shakllantirish
      const params = {
        limit: Number(limit),
        offset: Number(offset),
        ...(price_from !== null && { price_from }),
        ...(price_to !== null && { price_to }),
        ...(publisher_id && { publisher_id }),
        ...(category_id && { category_id }),
        ...(translator_id && { translator_id }),
        ...(author_id && { author_id }),
        ...(language_id && { language_id }),
        ...(city_id && { city_id }),
        ...(district_id && { district_id }),
        ...(title && { title }),
        ...(writing_type && { writing_type }),
        ...(status && { status }),
        ...(is_new !== null && { is_new }), // Agar is_new bo'lsa, qo'sh
      };

      console.log("Request parameters:", params); // Log parametrlar

      const response = await gatewayRequest.get(`/books/list`, { params });
      return response.data; // Javobdan data ni qaytar
    },
    onSuccess: (books) => {
      console.log("Books list:", books); // Muvaffaqiyatli fetch qilganda log
    },
    onError: (error) => {
      console.error("Error fetching books:", error?.response?.data || error); // Xatolikni log qilish
    },
  });
};
