import React from "react";
import { Row } from "antd";
import { LanguagesList } from "../../components/languages/languages-list";
import { LanguagesFilter } from "../../components/languages/languages-filter";

export const Languages = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 z-50 bg-accent border-b-2 border-dark">
        <Row justify="space-between" align="middle">
          <LanguagesFilter />
        </Row>
      </div>

      <div className="mt-5">
        <LanguagesList />
      </div>
    </div>
  );
};
