import React from "react";
import { CitiesList } from "../../components/cities/cities-list";
import { CitiesFilter } from "../../components/cities/cites-filter";
import { Row } from "antd";

export const Cities = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 z-50 bg-accent border-b-2 border-dark">
        <Row justify="space-between" align="middle">
          <CitiesFilter />
        </Row>
      </div>
      <div className="mt-5">
        <CitiesList />
      </div>
    </div>
  );
};
