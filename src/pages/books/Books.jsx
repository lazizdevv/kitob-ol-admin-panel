import React from "react";
import { BookList } from "../../components/books/BookList";
import { BooksFilter } from "../../components/books/BooksFilter";

export const Books = () => {
  return (
    <div className="space-y-5">
      <BooksFilter />
      <BookList />
    </div>
  );
};
