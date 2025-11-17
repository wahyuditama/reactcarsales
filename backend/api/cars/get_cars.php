<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/database.php");

$sql = mysqli_query($conn, "SELECT * FROM cars ORDER BY id DESC");

if (!$sql) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
    exit;
}

$cars = [];
if ($sql->num_rows > 0) {
    while ($row = $sql->fetch_assoc()) {
        $cars[] = [
            "id" => $row["id"],
            "name" => $row["name"],
            "brand" => $row["brand"],
            "year" => $row["year"],
            "price" => $row["price"],
            "description" => $row["description"],
            "image" => $row["image"],
            "created_at" => $row["created_at"]
        ];
    }

    echo json_encode([
        "status" => "success",
        "data" => $cars
    ]);
} else {
    echo json_encode([
        "status" => "empty",
        "message" => "Belum ada data mobil."
    ]);
}

$conn->close();
