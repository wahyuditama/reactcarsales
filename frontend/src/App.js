import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Cars from "./pages/admin/Cars";
import AddCar from "./pages/admin/AddCar";
import EditCar from "./pages/admin/EditCar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* ===== ADMIN AUTH ===== */}
        <Route path="/admin/login" element={<Login />} />

        {/* ===== ADMIN PANEL ===== */}
        <Route
          path="/admin/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cars"
          element={
            <ProtectedRoute>
              <Cars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/AddCar"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/EditCar/:id"
          element={
            <ProtectedRoute>
              <EditCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>Halaman Utama React</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
