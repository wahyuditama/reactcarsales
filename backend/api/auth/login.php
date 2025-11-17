<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

include("../../config/database.php");

// Ambil data dari React
$input = json_decode(file_get_contents("php://input"), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// Validasi input
if (!$email || !$password) {
    echo json_encode([
        "status" => "error",
        "message" => "Email & Password wajib diisi"
    ]);
    exit;
}

// Cari user berdasarkan email
$result = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");

if ($result->num_rows === 0) {

    echo json_encode([
        "status" => "error",
        "message" => "Akun tidak ditemukan"
    ]);
    exit;
}

$user = $result->fetch_assoc();
$_SESSION['ID'] = $user['id'];

if ($user['password'] === $password) {
    echo json_encode([
        "status" => "success",
        "message" => "Login berhasil",
        "user" => $user['id'],
        "email" => $user["email"],
        "role" => $user["role"]
    ]);
    exit;
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Password salah"
    ]);
    exit;
}
