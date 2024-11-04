import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetAuthorsById } from "../../service/query/useGetAuthorsbyId"; // Hook to get author by ID
import { useUpdateAuthors } from "../../service/mutation/useUpdateAuthors"; // Hook to update author
import { toast } from "react-toastify";
import { Loading } from "../../components/loading/loading";

const EditAuthors = () => {
  const { id } = useParams(); // Get the author ID from the URL
  const { data: author, isLoading } = useGetAuthorsById(id); // Fetch the author
  const updateAuthorsMutation = useUpdateAuthors(); // Hook to update author
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (author) {
      reset(author); // Set form values with fetched author data
    }
  }, [author, reset]);

  const onSubmit = async (data) => {
    try {
      await updateAuthorsMutation.mutateAsync({ id, ...data });
      toast.success("Muallif muvaffaqiyatli yangilandi!");
      navigate(-1);
    } catch (error) {
      setError("server", { message: error.message });
      toast.error("Muallifni yangilanishida xato yuz berdi.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-primary shadow-md border border-gray-200 rounded-lg mt-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        Muallifni Tahrirlash
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-2">Ism:</label>
          <input
            type="text"
            {...register("name", { required: "Bu maydon talab qilinadi" })}
            className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Surname Field */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-2">Familiya:</label>
          <input
            type="text"
            {...register("surname", { required: "Bu maydon talab qilinadi" })}
            className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          {errors.surname && (
            <p className="text-red-500">{errors.surname.message}</p>
          )}
        </div>

        {/* Biography Field */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-2">Biografiya:</label>
          <textarea
            {...register("biography", { required: "Bu maydon talab qilinadi" })}
            className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          {errors.biography && (
            <p className="text-red-500">{errors.biography.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full text-center">
          <button
            type="submit"
            className="mx-auto bg-primary text-white font-bold py-3 rounded-lg w-full max-w-lg hover:bg-dark transition-all duration-300"
            disabled={updateAuthorsMutation.isLoading}
          >
            {updateAuthorsMutation.isLoading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>

        {errors.server && (
          <p className="text-red-500">{errors.server.message}</p>
        )}
      </form>
    </div>
  );
};

export default EditAuthors;
