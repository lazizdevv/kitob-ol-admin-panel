import React from "react";
import { AuthorsList } from "../../components/authors-list/authors-list"; // Adjust the import path as needed
import { AuthorsFilter } from "../../components/authors-filter/authors-filter"; // Adjust the import path as needed
import { Row } from "antd";

export const Authors = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 bg-white border-b-2 border-b-primary z-50">
        <Row justify="space-between" align="middle">
          <AuthorsFilter />
        </Row>
      </div>

      <div className="mt-5">
        <AuthorsList />
      </div>
    </div>
  );
};
