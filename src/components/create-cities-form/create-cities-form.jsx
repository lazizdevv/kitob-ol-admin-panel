import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateCities } from "../../service/mutation/useCreateCities";

export const CreateCitiesForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const createCategoryMutation = useCreateCities();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Loadingni yoqish
    try {
      await createCategoryMutation.mutateAsync({
        name: data.name,
      }); // API chaqiruvini yuborish
      toast.success("Shahar muvaffaqiyatli yaratildi!");
      reset(); // Formani tozalash
      navigate(-1);
    } catch (error) {
      setError("server", { message: error.message });
      toast.error("Shahar yaratishda xato yuz berdi.");
    } finally {
      setLoading(false); // Loadingni o'chirish
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white shadow-md shadow-primary rounded-lg max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Shahar Yaratish</h2>

      {/* Grid layout for input fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* O'zbek nomi */}
        <div>
          <label className="block font-medium mb-2">Nom (O'zbek):</label>
          <input
            type="text"
            {...register("name.uz", { required: "Bu maydon talab qilinadi" })}
            className={`border p-2 w-full rounded-md ${
              errors.name?.uz ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="nomini kiriting"
          />
          {errors.name?.uz && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.name.uz.message}
            </p>
          )}
        </div>

        {/* Ingliz nomi */}
        <div>
          <label className="block font-medium mb-2">Nom (Ingliz):</label>
          <input
            type="text"
            {...register("name.en", { required: "Bu maydon talab qilinadi" })}
            className={`border p-2 w-full rounded-md ${
              errors.name?.en ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="name"
          />
          {errors.name?.en && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.name.en.message}
            </p>
          )}
        </div>

        {/* Rus nomi */}
        <div>
          <label className="block font-medium mb-2">Nom (Rus):</label>
          <input
            type="text"
            {...register("name.ru", { required: "Bu maydon talab qilinadi" })}
            className={`border p-2 w-full rounded-md ${
              errors.name?.ru ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Название"
          />
          {errors.name?.ru && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.name.ru.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="text-center">
        <button
          type="submit"
          className="max-w-lg w-full bg-primary hover:bg-dark text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Yaratyapti..." : "Shahar Yaratish"}
        </button>
      </div>

      {/* Serverdan kelgan xato xabarini ko'rsatish */}
      {errors.server && (
        <p className="text-red-500 text-center mt-4">{errors.server.message}</p>
      )}
    </form>
  );
};
