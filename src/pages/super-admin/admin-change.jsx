import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useGetAllAdmin } from "../../service/query/useGetAllAdmin"; // Ensure correct path to your hook
import { ListCard } from "../../components/list-card/list-card";

export const AdminChange = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [limit, setLimit] = useState(10); // Set limit
  const [offset, setOffset] = useState(0); // Set offset
  const { data, isLoading, isError, error } = useGetAllAdmin(limit, offset);

  // Setup the delete mutation

  console.log(data);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  // Filter by role
  const superAdmins =
    data?.users?.filter((user) => user.role === "superadmin") || [];
  const admins = data?.users?.filter((user) => user.role === "admin") || [];
  const users = data?.users?.filter((user) => user.role === "user") || [];

  // Check if there is more data for pagination
  const hasMoreData = data?.users?.length === limit;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hamma Adminlar</h2>

      {/* SuperAdmins */}
      {superAdmins.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4">SuperAdmins</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {superAdmins.map((admin) => (
              <ListCard role={admin} key={superAdmins.id}/>
            ))}
          </div>
        </div>
      )}

      {/* Adminlar */}
      {admins.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4">Admins</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {admins?.map((admin) => (
              <ListCard role={admin} key={admin.id} />
            ))}
          </div>
        </div>
      )}

      {/* Userlar */}
      {users.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4">Users</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <ListCard role={user} key={user.id} />
            ))}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))} // Previous
          disabled={offset === 0}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Oldingi
        </button>
        <button
          onClick={() => {
            if (hasMoreData) {
              setOffset((prev) => prev + limit); // Next
            }
          }} // Next
          disabled={!hasMoreData} // Disable if no more data
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
};
