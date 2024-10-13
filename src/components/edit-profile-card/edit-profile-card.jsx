import React from "react";

export const EditProfileCard = ({
  formData,
  handleFileChange,
  handleChange,
  handleSubmit,
  uploading,
}) => {
  return (
    <>
      <h1 className="text-xl font-bold mb-1">Profilni Yangilash</h1>
      <div className="max-w-2xl mx-auto p-3 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Rasm ko'rsatish */}
          {formData.image_url && (
            <div className="">
              <img
                src={formData.image_url}
                alt="Profil rasmi"
                className="w-28 h-28 rounded-full object-cover mx-auto"
              />
            </div>
          )}
          <div>
            <label className="font-medium">Profil rasmi yuklash:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange} // Fayl o'zgarishini kuzatish
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label className="font-medium">Ism:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="font-medium">Familiya:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="font-medium">Tug'ilgan sana:</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="font-medium">Telefon raqam:</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-3"
              required
            />
          </div>

          {uploading && <div>Rasm yuklanmoqda...</div>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 w-1/2"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
