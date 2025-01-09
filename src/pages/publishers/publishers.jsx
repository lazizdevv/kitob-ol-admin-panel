import React from "react";
import { Row } from "antd";
import { PublishersList } from "../../components/publishers/publishers-list";
import { PublishersFilter } from "../../components/publishers/publishers-filter";

export const Publishers = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 z-50 bg-accent border-b-2 border-dark">
        <Row justify="space-between" align="middle">
          <PublishersFilter />
        </Row>
      </div>

      <div className="mt-5">
        <PublishersList />
      </div>
    </div>
  );
};
