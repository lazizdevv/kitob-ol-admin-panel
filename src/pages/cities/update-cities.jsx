import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loading } from "../../components/loading/loading";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { useUpdateCities } from "../../service/mutation/useUpdateCities";

export const EditCities = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const { data: category, isLoading } = useGetCitiesById(id); // Fetch the category
  const updateCategoryMutation = useUpdateCities(); // Hook to update category
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      reset(category); // Set form values with fetched category data
    }
  }, [category, reset]);

  const onSubmit = async (data) => {
    try {
      await updateCategoryMutation.mutateAsync({ id, ...data });
      toast.success(`${data.name.uz} Til muvaffaqiyatli yangilandi!`);
      navigate(-1);
    } catch (error) {
      setError("server", { message: error.message });
      toast.error("Til yangilanishida xato yuz berdi.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-primary shadow-md border border-gray-200 rounded-lg mt-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        Shaharni Tahrirlash
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Uzbek Name Field */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Nom (O'zbek):</label>
            <input
              type="text"
              {...register("name.uz", { required: "Bu maydon talab qilinadi" })}
              className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
            {errors.name?.uz && (
              <p className="text-red-500">{errors.name.uz.message}</p>
            )}
          </div>

          {/* English Name Field */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Nom (Ingliz):</label>
            <input
              type="text"
              {...register("name.en", { required: "Bu maydon talab qilinadi" })}
              className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
            {errors.name?.en && (
              <p className="text-red-500">{errors.name.en.message}</p>
            )}
          </div>

          {/* Russian Name Field */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Nom (Rus):</label>
            <input
              type="text"
              {...register("name.ru", { required: "Bu maydon talab qilinadi" })}
              className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
            {errors.name?.ru && (
              <p className="text-red-500">{errors.name.ru.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full text-center">
          <button
            type="submit"
            className="mx-auto bg-primary text-white font-bold py-3 rounded-lg w-full max-w-lg hover:bg-dark transition-all duration-300"
            disabled={updateCategoryMutation.isLoading}
          >
            {updateCategoryMutation.isLoading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>

        {errors.server && (
          <p className="text-red-500">{errors.server.message}</p>
        )}
      </form>
    </div>
  );
};
