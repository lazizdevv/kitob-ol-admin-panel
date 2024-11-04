import React, { useState } from "react";
import { Pagination } from "antd";
import { AuthorsCard } from "../authors-card/authors-card"; // Adjust the import path as needed
import { useGetAuthors } from "../../service/query/useGetAuthors"; // Adjust the import path as needed
import { Loading } from "../loading/loading";

export const AuthorsList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * limit; // Offset calculation

  const { data, error, isLoading } = useGetAuthors("", limit, offset); // Fetching authors data

  if (isLoading) return <Loading />;
  if (error) return <p>Xatolik: {error.message}</p>;

  // Getting total count of authors
  const totalCount = data?.count || 0; // Ensure to handle if data is undefined
  const currentAuthors = data?.authors || []; // Ensure to handle if authors is undefined

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Mualliflar</h2>

      <div className="grid grid-cols-1 md:grid-cols-1">
        {currentAuthors.map((author) => (
          <AuthorsCard key={author.id} author={author} /> // Corrected component name
        ))}
      </div>

      <div className="flex justify-center items-center mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page); // Update the page when it changes
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20, 100]}
          onShowSizeChange={(current, size) => {
            setLimit(size); // Change the page size
            setCurrentPage(1); // Reset to page 1
          }}
          showQuickJumper // Quick jump to page option
        />
      </div>
    </div>
  );
};

// export default AuthorsList;
