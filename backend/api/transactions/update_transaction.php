<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$status = $data['payment_status'];

// if (!$id || !$status) {
//     echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
//     exit;
// }

$queryUpdateTransaction = mysqli_query($conn, "UPDATE transactions SET payment_status = '$status' WHERE id = '$id'");

// $result = mysqli_query($conn, $query);

if ($queryUpdateTransaction) {
    echo json_encode(["status" => "success", "message" => "Status transaksi diperbarui"]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal update status"]);
}
