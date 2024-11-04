import React from "react";
import { CitiesList } from "../../components/cities-list/cities-list";
import { CitiesFilter } from "../../components/cities-filter/cites-filter";
import { Row } from "antd";
import { DistrictFilter } from "../../components/district-filter/district-filter";
import { DistrictsList } from "../../components/districts-list/districts-list";

export const Districts = ({cityId}) => {
  return (
    <div className="relative">
      <div className="">
        {/* <h1>Cities</h1> */}
      </div>
      <div className="top-0 sticky p-3 bg-white border-b-2 border-b-primary z-50">
        <Row justify="space-between" align="middle">
          <>
            {/* <CitiesFilter /> */}
            <DistrictFilter cityId={cityId} />
          </>
        </Row>
      </div>
      <div className="mt-5">
        <DistrictsList cityId={cityId} />
      </div>
    </div>
  );
};
