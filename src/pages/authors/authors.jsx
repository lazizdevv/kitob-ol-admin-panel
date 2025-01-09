import React from "react";
import { AuthorsList } from "../../components/authors/authors-list";
import { AuthorsFilter } from "../../components/authors/authors-filter";
import { Row } from "antd";

export const Authors = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 z-50 bg-accent border-b-2 border-dark">
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
