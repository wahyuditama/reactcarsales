import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

function AddTransaction() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [totalPrice, setTotalPrice] = useState(0);

  // Fungsi format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

useEffect(() => {
  fetch("http://localhost/ppkd/carsales/backend/api/cars/get_cars.php")
  .then((res)=> res.json())
  .then((resData)=>{
    if (Array.isArray(resData.data)) {
      setCars(resData.data);
    }
  })  
  .catch((err)=>{
    console.log(err);
  });
}, []);


  useEffect(() => {
    if (selectedCar) {
      const price = Number(selectedCar.price) || 0;
      const qty = Number(quantity) || 0;
      setTotalPrice(price * qty);
    } else {
      setTotalPrice(0);
    }
  }, [selectedCar, quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCar || !customerName) {
      alert("Harap isi semua data!");
      return;
    }

    const formData = new FormData();
    formData.append("car_id", selectedCar.id);
    formData.append("customer_name", customerName);
    formData.append("quantity", quantity);
    formData.append("payment_method", paymentMethod);
    formData.append("total_price", totalPrice);

 fetch("http://localhost/ppkd/carsales/backend/api/transactions/add_transaction.php", {
  method: "POST",
  body: formData
})
  .then(res => res.text())
  .then(text => {
    // console.log("Response submit:", text);
    try {
      const data = JSON.parse(text);
      alert(data.message);
      window.location.href = "/admin/transactions";
    } catch (err) {
      console.error("Submit bukan JSON:", err);
      alert("Terjadi kesalahan pada server.");
    }
  })
  .catch(err => console.log(err));

  };

  return (
    <div className="flex ">

   <AdminSidebar/>
      <div className="flex-1 min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Tambah Transaksi</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <div className="mb-3">
          <label className="label">Pilih Mobil</label>
         <select className="w-full border border-gray-500 rounded-lg px-3 py-2" value={selectedCar?.id || ""} onChange={(e) => { 
            const car = cars.find((c) => c.id === e.target.value); 
            setSelectedCar(car || null);
            }}>
              <option value="">-- Pilih Mobil --</option>
              {cars.map((car) => (
            <option key={car.id} value={car.id}> 
              {car.name} - {formatRupiah(Number(car.price))}
            </option>
            )
          )}
         </select>
        </div>

        <div className="mb-3">
          <label className="label">Nama Pembeli</label>
          <input
            type="text"
            className="w-full bg-gray-500 rounded px-3 py-2"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="label">Quantity</label>
          <input
            type="number"
            min="1"
            className="w-full bg-gray-500 rounded px-3 py-2"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setQuantity(val > 0 ? val : 1);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="label">Metode Pembayaran</label>
          <select
            className="w-full bg-gray-500 rounded px-3 py-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="transfer">Transfer</option>
            <option value="credit">Kredit</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="label fw-bold">Total Harga</label>
          <input
            type="text"
            className="w-full bg-gray-500 rounded px-3 py-2"
            value={formatRupiah(totalPrice)}
            readOnly
          />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
          Simpan Transaksi
        </button>
      </form>

      </div>
    </div>
  );
}

export default AddTransaction;
