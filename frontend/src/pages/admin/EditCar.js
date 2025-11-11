import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    year: "",
    image: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  
useEffect(() => {
  const fetchCar = async () => {
    try {
      const response = await fetch(`http://localhost/ppkd/carsales/backend/api/cars/get_cars.php?id=${id}`);
      const data = await response.json();

      if (data.status === "success" && data.data.length > 0) {
        setFormData(data.data[0]);       
        setPreviewImage(data.data[0].image);
      } else {
        setMessage("Data mobil tidak ditemukan");
      }
    } catch (error) {
      console.error(error);
      setMessage("Gagal memuat data mobil");
    }
  };

  fetchCar();
}, [id]);



  // Fungsi ketika input berubah
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Fungsi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append("id", id);

    try {
      const response = await fetch(
        "http://localhost/ppkd/carsales/backend/api/cars/update_car.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const result = await response.json();

      if (result.status === "success") {
        setMessage("Data mobil berhasil diperbarui");
        setTimeout(() => navigate("/admin/cars"), 2000);
      } else {
        setMessage("Data gagal diperbarui");
      }
    } catch (error) {
      console.error(error);
      setMessage("Terjadi kesalahan saat memperbarui data");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Data Mobil</h1>

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
            {previewImage && (
              <img
                src={
                  typeof previewImage === "string"
                    ? `http://localhost/ppkd/carsales/backend/uploads/${previewImage}`
                    : previewImage
                }
                alt="Car"
                className="mt-3 w-40 rounded shadow"
              />
            )}
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
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCar;
