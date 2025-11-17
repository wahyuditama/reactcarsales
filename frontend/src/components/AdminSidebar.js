import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("id"));

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost/ppkd/carsales/backend/api/auth/logout.php",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (err) {
      console.error("Logout backend gagal:", err);
    }

    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    navigate("/admin/login");
  };

  useEffect(() => {
    const handleStorage = () => setUserId(localStorage.getItem("id"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="sidebar bg-gray-800 text-white min-h-screen w-60 p-4">
      <div className="text-2xl font-bold mb-6 text-center">Halaman Admin</div>
      <ul className="space-y-3">
        <li>
          <Link
            to="/admin/dashboard"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/cars"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Data Mobil
          </Link>
        </li>
      {userId === "1" && (
        <li>
          <Link to="/admin/transactions" className="block py-2 px-4 rounded hover:bg-gray-700">
            Transaksi
          </Link>
        </li>
      )}
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
