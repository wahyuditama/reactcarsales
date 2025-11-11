import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCars = async () => {
    try {
      const response = await fetch(
        "http://localhost/ppkd/carsales/backend/api/cars/get_cars.php"
      );
      const result = await response.json();
      if (result.status === "success") {
        setCars(result.data);
      } else {
        setMessage("Data gagal dimuat");
      }
    } catch (error) {
      console.error(error);
      setMessage("Terjadi kesalahan koneksi");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const response = await fetch(
        `http://localhost/ppkd/carsales/backend/api/cars/delete_car.php?id=${id}`,
        { method: "GET" }
      );
      const result = await response.json();
      if (result.status === "success") {
        setMessage("Mobil berhasil dihapus!");
        fetchCars();
      } else {
        setMessage("Gagal menghapus data");
      }
    } catch (error) {
      console.error(error);
      setMessage("Kesalahan koneksi");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Daftar Mobil</h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
            {message}
          </div>
        )}

          <Link to="/admin/Addcar" className="inline-block mb-4 px-3 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
            Tambah Data
          </Link>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Gambar</th>
                <th className="py-3 px-4 text-left">Nama Mobil</th>
                <th className="py-3 px-4 text-left">Merek</th>
                <th className="py-3 px-4 text-left">Harga</th>
                <th className="py-3 px-4 text-left">Tahun</th>
                <th className="py-3 px-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cars.length > 0 ? (
                cars.map((car, index) => (
                  <tr key={car.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <img
                        src={`http://localhost/ppkd/carsales/backend/uploads/${car.image}`}
                        alt={car.name}
                        className="w-20 rounded-md shadow"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold">{car.name}</td>
                    <td className="py-3 px-4">{car.brand}</td>
                    <td className="py-3 px-4">
                      Rp {parseInt(car.price).toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4">{car.year}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin/EditCar/${car.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    Tidak ada data mobil ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cars;
