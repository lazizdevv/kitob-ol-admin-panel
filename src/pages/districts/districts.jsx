import React from "react";
import { Row } from "antd";
import { DistrictFilter } from "../../components/districts/district-filter";
import { DistrictsList } from "../../components/districts/districts-list";

export const Districts = ({ cityId }) => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 z-50 bg-accent border-b-2 border-dark">
        <Row justify="space-between" align="middle">
          <DistrictFilter city_id={cityId} />
        </Row>
      </div>
      <div className="mt-5">
        <DistrictsList city_id={cityId} />
      </div>
    </div>
  );
};
