import React from "react";
import { CategoriesList } from "../../components/category-List/category-List";
import { CategoriesFilter } from "../../components/category-filter/category-filter";
import { Row } from "antd";

export const Categories = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 bg-white border-b-2 border-b-primary z-50">
        <Row justify="space-between" align="middle">
          <>
            <CategoriesFilter />
          </>
        </Row>
      </div>

      <div className="mt-5">
        <CategoriesList />
      </div>
    </div>
  );
};
