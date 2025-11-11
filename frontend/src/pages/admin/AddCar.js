import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    year: "",
    image: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("price", formData.price);
    data.append("year", formData.year);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const response = await fetch(
        "http://localhost/ppkd/carsales/backend/api/cars/add_car.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setMessage("Mobil berhasil ditambahkan!");
        setFormData({
          name: "",
          brand: "",
          price: "",
          year: "",
          description: "",
          image: "",
        });
      } else {
        setMessage("Data gagal ditambahkan" + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan koneksi ke server!");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Konten utama */}
      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Tambah Mobil Baru</h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Nama Mobil</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Merek</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Harga</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Tahun</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Gambar Mobil</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Simpan Mobil
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
