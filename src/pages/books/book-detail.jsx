import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { useGetBooksById } from "../../service/query/useGetBookById";
import { Button, Typography, Divider } from "antd";

const { Title, Text } = Typography;

export const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, error } = useGetBooksById(id);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const handleBack = () => {
    navigate(-1);
  };

  // Har bir maydonni namoyish qilish uchun yordamchi komponent
  const BookField = ({ label, value }) => (
    <div>
      <Title level={4} className="text-gray-900">
        {label}
      </Title>
      <Text className="text-lg text-gray-700">{value || "Noma'lum"}</Text>
    </div>
  );

  return (
    <div className="max-w-screen-lg w-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <Title level={2} className="text-center text-black">
        Kitob Batafsil Sahifasi
      </Title>

      <Divider />

      {/* Kitob detallari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <BookField label="Kitob nomi:" value={book.title} />
        <BookField label="Narxi:" value={`${book.price || 0} UZS`} />
        <BookField label="Chop etilgan yil:" value={book.published_year} />
        <BookField label="Jami sahifalar soni:" value={book.total_pages} />
        <BookField label="Kitobning tavsifi:" value={book.description} />
        <BookField label="Muallif ID:" value={book.author_id} />
        <BookField label="Kategoriya ID:" value={book.category_id} />
        <BookField label="Nashriyot ID:" value={book.publisher_id} />
        <BookField label="Shitrix kodi:" value={book.shitrix_code} />
        <BookField label="Yozuv turi:" value={book.writing_type} />
        <BookField label="Yaratilgan sana:" value={book.created_at} />
        <BookField label="Qopqoq turi:" value={book.cover_type} />
        <BookField label="Qopqoq formati:" value={book.cover_format} />
        <BookField
          label="Sotuvdagi holati:"
          value={book.stock > 0 ? "Bor" : "Mavjud emas"}
        />
        <BookField label="Yangi:" value={book.is_new ? "Ha" : "Yo‘q"} />
        <BookField
          label="Lokatsiya:"
          value={`Shahar: ${book.location?.city_id}, Tuman: ${book.location?.district_id}`}
        />
        <BookField label="Ko‘rishlar soni:" value={book.view_count} />
      </div>

      {/* Kitob rasmi */}
      {book.image_url && (
        <div className="flex justify-center">
          <img
            src={book.image_url}
            alt="Kitob rasimi"
            className="w-64 h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Orqaga qaytish tugmasi */}
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-600"
        >
          Orqaga
        </Button>
      </div>
    </div>
  );
};
