import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="sidebar -bg-gray-800 text-white min-h-screen w-60 p-4">
            <div className="text-2xl font-bold mb-6 text-center">Halaman admin</div>
            <ul className="space-y-3">
                <li>
                    <Link to="/admin/Dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/cars" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Data Mobil</Link>
                </li>
                <li>
                    <Link to="/admin/login" className="block py-2 px-4 rounded hover:bg-gray-700">
                    logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;