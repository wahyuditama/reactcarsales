import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email dan password wajib diisi!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/ppkd/carsales/backend/api/auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("adminToken", result.token);
        localStorage.setItem("adminName", result.user.name);

        setMessage("Login berhasil! Mengalihkan...");
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        setMessage("Email atau password salah!");
      }
    } catch (error) {
      console.error(error);
      setMessage("connection gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Admin Login
        </h1>

        {message && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
