<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/database.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $delete = mysqli_query($conn, "DELETE FROM cars WHERE id = '$id'");

    if ($delete) {
        echo json_encode([
            "status" => "success",
            "message" => "Mobil berhasil dihapus"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Gagal menghapus data"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Parameter id tidak ditemukan"
    ]);
}
