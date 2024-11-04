import React from "react";
import { BookList } from "../../components/book-list/BookList";
import { BooksFilter } from "../../components/book-filter/BooksFilter";

export const Books = () => {
  return (
    <div>
      <BooksFilter />
      <BookList />
    </div>
  );
};
