import React, { useState } from "react";
import { Spin, Pagination, List, message } from "antd";
import { useGetVacancies } from "../../service/query/useGetVacancies";
import { VacancyCard } from "../vacancies-card/vacancies-card";

export const VacanciesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const offset = (currentPage - 1) * pageSize;

  const { data, isLoading, isError, error } = useGetVacancies({
    limit: pageSize,
    offset,
  });

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize); // Updates page size if changed
  };

  if (isError) {
    message.error("Failed to load vacancies. Please try again.");
    console.error("Error fetching vacancies:", error);
  }

  return (
    <div className="vacancies-list-container">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Loading vacancies..." />
        </div>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={data?.vacancies || []}
            renderItem={(vacancy) => (
              <List.Item>
                <VacancyCard vacancy={vacancy} />
              </List.Item>
            )}
            locale={{ emptyText: "No vacancies found" }}
          />
          <div className="pagination-controls mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data?.count || 0}
              onChange={handlePageChange}
              showSizeChanger // Allows selection of page size
              pageSizeOptions={["10", "20", "50", "100"]} // Page size options
              showQuickJumper // Allows "Go to page" input
            />
          </div>
        </>
      )}
    </div>
  );
};
