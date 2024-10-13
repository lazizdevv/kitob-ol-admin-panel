import React from "react";
import { useAdminDelete } from "../../service/mutation/useAdminDelete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const ListCard = ({ role }) => {
  const { mutate, error, isPending } = useAdminDelete();

  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Admin muvaffaqiyatli o'chirildi!");
      },
      onError: () => {
        toast.error(error.message);
      },
    });
  };
  console.log(role.id);

  return (
    <>
      {}
      <div
        key={role.id}
        className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
      >
        <div className="text-end">
          <Link to={`/super-admin/detail-page/${role.id}`}>
            <h1 className="underline text-blue-400 font-semibold">
              ko'proq ko'rish
            </h1>
          </Link>
        </div>
        <div className="">
          <img
            className="w-20 h-20 object-cover rounded-lg"
            src={role?.image_url || "https://via.placeholder.com/80"}
            alt="yo'q"
          />
        </div>
        <p className="font-bold">Email: {role.email}</p>
        <p>Role: {role.role}</p>
        
        <div className="mt-4 flex justify-between">
          {role.role == "superadmin" ? (
            ""
          ) : (
            <button
              onClick={() => handleDelete(role.id)} // Navigate to Single Admin page
              className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              {isPending ? "deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
