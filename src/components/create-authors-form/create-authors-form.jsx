import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateAuthors } from "../../service/mutation/useCreateAuthors"; // Hook for creating authors
import { toast } from "react-toastify"; // Importing Toastify library
import { useNavigate } from "react-router-dom";

export const CreateAuthorsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm(); // Using useForm hook
  const createAuthorsMutation = useCreateAuthors(); // Hook for creating authors
  const [loading, setLoading] = useState(false); // Adding loading state
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Turn on loading state
    try {
      await createAuthorsMutation.mutateAsync({
        name: data.name,
        surname: data.surname, // Change familyName to surname for API request
        biography: data.biography,
        // Ensure other fields are included if necessary
      }); // Send API request
      toast.success("Muallif muvaffaqiyatli yaratildi!"); // Show success toast
      reset(); // Reset form
      navigate(-1); // Go back
    } catch (error) {
      setError("server", { message: error.message }); // Show error on failure
      toast.error("Muallif yaratishda xato yuz berdi."); // Show error toast
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white shadow-md shadow-primary rounded-lg max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Muallif Yaratish</h2>

      {/* Input fields for author's details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Author's name */}
        <div>
          <label className="block font-medium mb-2">Ism:</label>
          <input
            type="text"
            {...register("name", { required: "Bu maydon talab qilinadi" })}
            className={`border p-2 w-full rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Muallif ismini kiriting"
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Author's surname */}
        <div>
          <label className="block font-medium mb-2">Familiya:</label>
          <input
            type="text"
            {...register("surname", {
              required: "Bu maydon talab qilinadi",
            })}
            className={`border p-2 w-full rounded-md ${
              errors.surname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Muallif familiyasini kiriting"
          />
          {errors.surname && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.surname.message}
            </p>
          )}
        </div>

        {/* Author's biography */}
        <div>
          <label className="block font-medium mb-2">Biografiya:</label>
          <textarea
            {...register("biography", { required: "Bu maydon talab qilinadi" })}
            className={`border p-2 w-full rounded-md ${
              errors.biography ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Muallif biografiyasini kiriting"
            rows="4"
          />
          {errors.biography && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.biography.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="text-center">
        <button
          type="submit"
          className="max-w-lg w-full bg-primary hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Yaratyapti..." : "Muallif Yaratish"}
        </button>
      </div>

      {/* Show server error message */}
      {errors.server && (
        <p className="text-red-500 text-center mt-4">{errors.server.message}</p>
      )}
    </form>
  );
};
