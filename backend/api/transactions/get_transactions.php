<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../../config/database.php");

$queryResult = mysqli_query($conn, "SELECT t.*, c.name AS car_name FROM transactions t JOIN cars c ON t.car_id = c.id ORDER BY t.id DESC");

// $result = mysqli_query($conn, $query);

$transactions = [];

while ($row = mysqli_fetch_assoc($queryResult)) {
    $transactions[] = $row;
}

echo json_encode($transactions);
