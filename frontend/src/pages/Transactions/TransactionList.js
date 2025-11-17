import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { Link } from "react-router-dom";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/ppkd/carsales/backend/api/transactions/get_transactions.php")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.log(err));
  }, []);

    const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const response = await fetch(
        `http://localhost/ppkd/carsales/backend/api/transactions/delete_transactions.php?id=${id}`,
        { method: "GET" }
      );
      const result = await response.json();
      if (result.status === "success") {
        setMessage("Data berhasil dihapus!");
      } else {
        setMessage("Gagal menghapus data");
      }
    } catch (error) {
      console.error(error);
      setMessage("Kesalahan koneksi");
    }
  };

  return (
    <div className=" flex">
      <AdminSidebar/>

    <div className="flex-1 bg-gray-100 min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Daftar Transaksi</h2>

      <Link to="/admin/Transactions/Add" className="inline-block mb-4 px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white">Tambah data</Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md text-center">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm table-bordered border-separate border border-gray-400">
            <tr>
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Mobil</th>
              <th className="py-3 px-4 text-left">Pembeli</th>
              <th className="py-3 px-4 text-left">Qty</th>
              <th className="py-3 px-4 text-left">Total Harga</th>
              <th className="py-3 px-4 text-left">Metode Pembayaran</th>
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">Tidak ada transaksi</td>
              </tr>
            ) : (
              transactions.map((trx,index) => (
                <tr key={trx.id}>
                  <td>{index + 1 }</td>
                  <td>{trx.car_name}</td>
                  <td>{trx.user_name}</td>
                  <td>{trx.quantity}</td>
                  <td>Rp {trx.total_price}</td>
                  <td>{trx.payment_method}</td>
                  <td>{trx.created_at}</td>
                  <td>
                    <button
                        onClick={() => handleDelete(trx.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Hapus
                      </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}

export default TransactionList;
