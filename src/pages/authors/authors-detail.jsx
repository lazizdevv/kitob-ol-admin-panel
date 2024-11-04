import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAuthorsById } from "../../service/query/useGetAuthorsbyId";
import { Loading } from "../../components/loading/loading";
import { loadState } from "../../config/stroge";

export const AuthorsDetailPage = () => {
  const { id } = useParams(); // Get the author ID from the URL
  const { data: author, isLoading, error } = useGetAuthorsById(id); // Fetch author details by ID

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  //   console.log(author);

  const user = loadState("user");

  const updateLink =
    user.role === "superadmin"
      ? `/super-admin/authors-update/${author.id}`
      : `/admin/authors-update/${author.id}`;

  return (
    <div className="max-w-screen-lg w-full mx-auto p-0 md:p-3">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Muallif Batafsil Sahifa
      </h1>

      <div className="border rounded-lg p-6 shadow-primary shadow-md transition-shadow duration-300 bg-white">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {author.name || "N/A"} {/* Author's name */}
        </h3>

        {/* Biography */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Biografiya:</h4>
            <p className="text-gray-700">
              {author.biography || "Biografiya mavjud emas"}
            </p>
          </div>
        </div>

        {/* Edit button */}
        <div className="flex justify-center mt-8">
          <Link
            to={updateLink} // Redirect to the edit page
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Tahrirlash
          </Link>
        </div>
      </div>
    </div>
  );
};
