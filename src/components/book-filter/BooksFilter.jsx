import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce"; // Debounce hook for search
import { useGetBooks } from "../../service/query/useGetBooks"; // Hook to fetch books
import { BookCard } from "../bookCard/BookCard"; // BookCard component
import { Select, Input, Form, Button, Spin } from "antd";

const { Option } = Select;

export const BooksFilter = () => {
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
    publisher: "",
  });
  const [searchTriggered, setSearchTriggered] = useState(false); // New state to track search

  const debouncedFilters = useDebounce(filters, 500); // Debounce filters
  const { data, isLoading, error } = useGetBooks(
    searchTriggered ? debouncedFilters : {}
  ); // Use debounced filters only if search is triggered

  if (error)
    return <div className="text-red-500 text-center">Xatolik yuz berdi</div>;

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setSearchTriggered(true); // Set search triggered to true when button is clicked
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      {/* Search and Filter Form */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Kitoblar uchun filtrlar
      </h2>
      <Form layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Filter */}
          <Form.Item label="Kitob nomi">
            <Input
              placeholder="Kitob nomi"
              value={filters.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="rounded-md border border-gray-300"
            />
          </Form.Item>

          {/* Author Filter */}
          <Form.Item label="Muallif">
            <Input
              placeholder="Muallif"
              value={filters.author}
              onChange={(e) => handleChange("author", e.target.value)}
              className="rounded-md border border-gray-300"
            />
          </Form.Item>

          {/* Publisher Filter */}
          <Form.Item label="Nashriyot">
            <Input
              placeholder="Nashriyot"
              value={filters.publisher}
              onChange={(e) => handleChange("publisher", e.target.value)}
              className="rounded-md border border-gray-300"
            />
          </Form.Item>

          {/* Year Filter */}
          <Form.Item label="Yili">
            <Input
              placeholder="Yili"
              value={filters.year}
              onChange={(e) => handleChange("year", e.target.value)}
              className="rounded-md border border-gray-300"
            />
          </Form.Item>

          {/* Genre Filter */}
          <Form.Item label="Janr">
            <Select
              placeholder="Janr"
              value={filters.genre}
              onChange={(value) => handleChange("genre", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Barchasi</Option>
              <Option value="fantasy">Fantaziya</Option>
              <Option value="history">Tarixiy</Option>
              <Option value="science">Ilmiy</Option>
              {/* Add more genres as needed */}
            </Select>
          </Form.Item>
        </div>

        {/* Search Button */}
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSearch} // Trigger search on button click
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 transition"
          >
            Qidirish
          </Button>
        </Form.Item>
      </Form>

      {/* Books List */}
      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto mt-4">
        {isLoading ? (
          <div className="text-center text-gray-500 font-semibold">
            <Spin tip="Yuklanmoqda..." />
          </div>
        ) : searchTriggered && data.books?.length > 0 ? (
          data.books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          searchTriggered && (
            <div className="text-center text-red-500 font-semibold">
              Hech qanday kitob topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
