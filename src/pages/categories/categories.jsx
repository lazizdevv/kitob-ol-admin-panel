import React from "react";
import { CategoriesList } from "../../components/categories/category-List";
import { CategoriesFilter } from "../../components/categories/category-filter";
import { Row } from "antd";

export const Categories = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky py-2 z-50 bg-accent border-b-2 border-dark">
        <Row justify="space-between" align="middle">
          <CategoriesFilter />
        </Row>
      </div>

      <div className="mt-5">
        <CategoriesList />
      </div>
    </div>
  );
};
