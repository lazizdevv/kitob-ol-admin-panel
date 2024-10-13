import React, { useState } from "react";
import { useAdminCreate } from "../../service/mutation/useAdminCreate"; // Ensure correct path to your custom hook
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export const AdminCreate = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { mutate, isLoading, isError, error } = useAdminCreate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        // Reset form data after successful creation
        toast.success("Admin muvaffaqiyatli yaratildi!"); // Show success toast
        setFormData({ email: "", password: "" });
      },
      onError: () => {
        toast.error(error.message); // Show error toast
      },
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">Create New Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Admin"}
        </button>

        {isError && (
          <p className="text-red-500 text-sm mt-2">{error.message}</p>
        )}
      </form>
      <ToastContainer /> {/* Include the ToastContainer to display toasts */}
    </div>
  );
};
