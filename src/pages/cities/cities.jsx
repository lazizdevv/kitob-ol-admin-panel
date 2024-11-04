import React from "react";
import { CitiesList } from "../../components/cities-list/cities-list";
import { CitiesFilter } from "../../components/cities-filter/cites-filter";
import { Row } from "antd";

export const Cities = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 bg-white border-b-2 border-b-dark z-50">
        <Row justify="space-between" align="middle">
          <>
            <CitiesFilter />
          </>
        </Row>
      </div>
      <div className="mt-5">
        <CitiesList />
      </div>
    </div>
  );
};
