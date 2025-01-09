import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { Button, Typography, Flex } from "antd";
import { useGetById } from "../../service/query/useGetById";
import { useGetList } from "../../service/query/useGetList";
import {
  authorsEndPoints,
  booksEndPoints,
  categoriesEndPoints,
  citiesEndPoints,
  districtsEndPoints,
  languagesEndPoints,
  publishersEndPoints,
  tarnslatorsEndPoints,
} from "../../config/endpoints";

const { Title, Text } = Typography;

export const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: book,
    isLoading,
    error,
  } = useGetList(booksEndPoints.get, { book_id: id });

  const { data: author } = useGetById(authorsEndPoints.get, book?.author_id);
  const { data: publisher } = useGetById(
    publishersEndPoints.get,
    book?.publisher_id
  );
  const { data: category } = useGetById(
    categoriesEndPoints.get,
    book?.category_id
  );
  const { data: city } = useGetById(
    citiesEndPoints.get,
    book?.location?.city_id
  );
  const { data: district } = useGetById(
    districtsEndPoints.get,
    book?.location?.district_id
  );
  const { data: traslator } = useGetById(
    tarnslatorsEndPoints.get,
    book?.translator_id
  );
  const { data: language } = useGetById(
    languagesEndPoints.get,
    book?.language_id
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const handleBack = () => {
    navigate(`/admin/books`);
  };

  const BookField = ({ label, value }) => (
    <div>
      <Title level={4} className="text-gray-900">
        {label}
      </Title>
      <Text className="text-lg text-gray-700">{value || "Noma'lum"}</Text>
    </div>
  );

  return (
    <div className="max-w-screen-xl w-full mx-auto p-6 bg-accent rounded-lg shadow-md shadow-dark space-y-6">
      <Title level={2} className="text-center text-black">
        Kitob Batafsil Sahifasi
      </Title>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <BookField label="Kitob nomi:" value={book?.title} />
        <BookField label="Narxi:" value={`${book?.price || 0} UZS`} />
        <BookField label="Chop etilgan yil:" value={book?.published_year} />
        <BookField label="Jami sahifalar soni:" value={book?.total_pages} />
        <BookField label="Til:" value={language?.uz} />
        <BookField label="Muallif:" value={author?.name} />
        <BookField label="Kategoriya:" value={category?.name?.uz} />
        <BookField label="Nashriyot:" value={publisher?.name} />
        <BookField
          label="Tarjimon:"
          value={`Ism: ${traslator?.name || "Noma'lum"}, Familiya: ${
            traslator?.surname || "Noma'lum"
          }`}
        />
        <BookField label="Shitrix kodi:" value={book?.shitrix_code} />
        <BookField label="Yozuv turi:" value={book?.writing_type} />
        <BookField label="Yaratilgan sana:" value={book?.created_at} />
        <BookField label="Qopqoq turi:" value={book?.cover_type} />
        <BookField label="Qopqoq formati:" value={book?.cover_format} />
        <BookField
          label="Sotuvdagi holati:"
          value={book.stock > 0 ? "Bor" : "Mavjud emas"}
        />
        <BookField label="Yangi:" value={book.is_new ? "Ha" : "Yo‘q"} />
        <BookField
          label="Lokatsiya:"
          value={`Shahar: ${city?.name?.uz}, Tuman: ${district?.name?.uz}`}
        />
        <BookField label="Ko‘rishlar soni:" value={book?.view_count} />
      </div>
      <BookField label="Kitobning tavsifi:" value={book?.description} />

      <Flex justify="space-around" gap={24} wrap>
        {book.image_url && (
          <img
            src={book.image_url}
            alt="Kitob rasimi"
            className="w-64 h-auto rounded-lg shadow-md shadow-dark object-contain"
          />
        )}
        {book.img_url && (
          <img
            src={book.img_url}
            alt="Kitob rasimi"
            className="w-64 h-auto rounded-lg shadow-md shadow-dark object-contain"
          />
        )}
      </Flex>

      <Flex justify="center">
        <Button type="primary" size="large" onClick={handleBack}>
          Ortga
        </Button>
      </Flex>
    </div>
  );
};
