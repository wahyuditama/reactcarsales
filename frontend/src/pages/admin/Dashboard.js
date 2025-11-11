import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const Dashboard = () => {

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

      useEffect(() =>{
        fetchCars();
      },[]);
    return (
        <div className="flex">
            <AdminSidebar/>

            <div className="flex-1 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-1xl font-bold mb-6">Dashboard Admin</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card-Tailwind */}
                 {cars.length > 0 ? (
                    cars.map((car, index) => (
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
                        <img
                            src={`http://localhost/ppkd/carsales/backend/uploads/${car.image}`}
                            alt={`car.name`}
                            className="w-100 h-48 object-cover text center rounded-md shadow"
                        />
                            <div className="p-4">
                                <div className="flex justify-between text-center">
                                <h5 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                {car.brand}
                                 </h5>
                                <p className="text-gray-900 dark:text-white">{car.name}</p>
                           </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                           {car.description	}
                            </p>
                            <a href="#" className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                           {car.price}
                            </a>
                        </div>
                </div>
                    ))
                 ) : (
                    <h1>Data Tidak ditemukan</h1>
                 )}

                     {/* <div className="bg-white shadow p-6 rounded-xl">
                        <h2 className="text-gray-600">Mobil Terjual</h2>
                        <p className="text-3xl font-semibold mt-2">12</p>
                    </div>

                    <div className="bg-white shadow p-6 rounded-xl">
                        <h2 className="text-gray-600">Pengguna Terdaftar</h2>
                        <p className="text-3xl font-semibold mt-2">5</p>
                    </div>
                     */}
                </div>
                 <div className="mt-10 bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
                <p className="text-gray-500">Belum ada aktivitas terkini...</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;