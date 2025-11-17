<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/database.php");

$car_id = $_POST['car_id'];
$customer_name = $_POST['customer_name'];
$quantity = $_POST['quantity'];
$payment_method = $_POST['payment_method'];
$total_price = $_POST['total_price'];


$insertQuery = mysqli_query($conn, "INSERT INTO transactions (car_id,user_name, quantity, payment_method, total_price)VALUES ('$car_id','$customer_name','$quantity','$payment_method', '$total_price')");

if ($insertQuery) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Transaksi berhasil'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Gagal menyimpan transaksi: ' . mysqli_error($conn)
    ]);
}
