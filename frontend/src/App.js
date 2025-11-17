// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Cars from "./pages/admin/Cars";
import AddCar from "./pages/admin/AddCar";
import EditCar from "./pages/admin/EditCar";
import TransactionList from "./pages/Transactions/TransactionList";
import AddTransaction from "./pages/Transactions/AddTransaction";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Cars */}
      <Route
        path="/admin/cars"
        element={
          <ProtectedRoute>
            <Cars />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/addcar"
        element={
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/editcar/:id"
        element={
          <ProtectedRoute>
            <EditCar />
          </ProtectedRoute>
        }
      />

      {/* Transactions */}
      <Route
        path="/admin/transactions"
        element={
          <ProtectedRoute>
            <TransactionList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/transactions/add"
        element={
          <ProtectedRoute>
            <AddTransaction />
          </ProtectedRoute>
        }
      />

      {/* Redirect /admin/transactions/TransactionList ke /admin/transactions */}
      <Route
        path="/admin/transactions/TransactionList"
        element={<Navigate to="/admin/transactions" replace />}
      />

      {/* Halaman utama */}
      <Route
        path="/"
        element={
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>
            Halaman Utama React
          </h1>
        }
      />

      {/* Catch-all route untuk 404 */}
      <Route
        path="*"
        element={
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>
            404 - Halaman Tidak Ditemukan
          </h1>
        }
      />
    </Routes>
  );
}

export default App;
