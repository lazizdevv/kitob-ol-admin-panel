import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "../../service/mutation/useCreateCategory"; // API chaqiruvini o'z ichiga olgan hook
import { toast } from "react-toastify"; // Toastify kutubxonasini import qilish
import { useNavigate } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css'; // CSS ni import qilish

export const CreateCategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm(); // useForm hookini chaqirish
  const createCategoryMutation = useCreateCategory(); // Kategoriya yaratish uchun hook
  const [loading, setLoading] = useState(false); // Loading holatini qo'shish
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Loadingni yoqish
    try {
      await createCategoryMutation.mutateAsync({
        name: data.name,
        description: data.description,
      }); // API chaqiruvini yuborish
      toast.success("Kategoriya muvaffaqiyatli yaratildi!"); // Toast ko'rsatish
      reset(); // Formani tozalash
      navigate(-1);
    } catch (error) {
      setError("server", { message: error.message }); // Xato bo'lganda xato ko'rsatish
      toast.error("Kategoriya yaratishda xato yuz berdi."); // Xato toast ko'rsatish
    } finally {
      setLoading(false); // Loadingni o'chirish
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white shadow-md shadow-primary rounded-lg max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Kategoriya Yaratish
      </h2>

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
            placeholder="Kategoriya nomini kiriting"
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
            placeholder="Category name"
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
            placeholder="Название категории"
          />
          {errors.name?.ru && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.name.ru.message}
            </p>
          )}
        </div>
      </div>

      {/* Grid layout for description fields */}
      <div className="">
        {/* O'zbek tavsifi */}
        <div>
          <label className="block font-medium mb-2">Tavsif (O'zbek):</label>
          <textarea
            {...register("description.uz", {
              required: "Bu maydon talab qilinadi",
            })}
            className={`border p-2 w-full rounded-md ${
              errors.description?.uz ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Kategoriya tavsifi"
            rows="4"
          />
          {errors.description?.uz && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.uz.message}
            </p>
          )}
        </div>

        {/* Ingliz tavsifi */}
        <div>
          <label className="block font-medium mb-2">Tavsif (Ingliz):</label>
          <textarea
            {...register("description.en", {
              required: "Bu maydon talab qilinadi",
            })}
            className={`border p-2 w-full rounded-md ${
              errors.description?.en ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Category description"
            rows="4"
          />
          {errors.description?.en && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.en.message}
            </p>
          )}
        </div>

        {/* Rus tavsifi */}
        <div>
          <label className="block font-medium mb-2">Tavsif (Rus):</label>
          <textarea
            {...register("description.ru", {
              required: "Bu maydon talab qilinadi",
            })}
            className={`border p-2 w-full rounded-md ${
              errors.description?.ru ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Описание категории"
            rows="4"
          />
          {errors.description?.ru && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.ru.message}
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
          {loading ? "Yaratyapti..." : "Kategoriya Yaratish"}
        </button>
      </div>

      {/* Serverdan kelgan xato xabarini ko'rsatish */}
      {errors.server && (
        <p className="text-red-500 text-center mt-4">{errors.server.message}</p>
      )}
    </form>
  );
};
