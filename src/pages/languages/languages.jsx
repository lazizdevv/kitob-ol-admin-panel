import React from "react";
import { CategoriesList } from "../../components/category-List/category-List";
import { CategoriesFilter } from "../../components/category-filter/category-filter";
import { Row } from "antd";
import { LanguagesList } from "../../components/languages-list/languages-list";
import { LanguagesFilter } from "../../components/languages-filter/languages-filter";

export const Languages = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 bg-white border-b-2 border-b-primary z-50">
        <Row justify="space-between" align="middle">
          <>
            <LanguagesFilter />
          </>
        </Row>
      </div>

      <div className="mt-5">
        {/* <CategoriesList /> */}
        <LanguagesList/>
      </div>
    </div>
  );
};
