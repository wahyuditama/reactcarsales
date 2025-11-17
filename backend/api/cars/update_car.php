<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


// ini_set('display_errors', 0);
// error_reporting(E_ALL);

include("../../config/database.php");

$id = isset($_POST['id']) ? $_POST['id'] : '';

if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'ID tidak boleh kosong']);
    exit;
}

// Cek data mobil
$carsEdit = mysqli_query($conn, "SELECT * FROM cars WHERE id = '$id'");
$rowEdit = mysqli_fetch_assoc($carsEdit);

if (!$rowEdit) {
    echo json_encode(['status' => 'error', 'message' => 'Data mobil tidak ditemukan']);
    exit;
}

$name = $_POST['name'] ?? '';
$brand = $_POST['brand'] ?? '';
$year = $_POST['year'] ?? '';
$price = $_POST['price'] ?? '';
$description = $_POST['description'] ?? '';

$imageName = $rowEdit['image'];

if (isset($_FILES['image']) && $_FILES['image']['name'] != '') {
    $image = $_FILES['image']['name'];
    $tmpName = $_FILES['image']['tmp_name'];

    $allowedExt = ['png', 'jpg', 'jpeg'];
    $ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));

    if (!in_array($ext, $allowedExt)) {
        echo json_encode(['status' => 'error', 'message' => 'Ekstensi file tidak valid']);
        exit;
    }

    // Hapus file lama
    if (!empty($rowEdit['image']) && file_exists('../../uploads/' . $rowEdit['image'])) {
        unlink('../../uploads/' . $rowEdit['image']);
    }
}

$update = mysqli_query($conn, "UPDATE cars SET 
    name = '$name',
    brand = '$brand',
    year = '$year',
    price = '$price',
    description = '$description',
    image = '$imageName'
    WHERE id = '$id'
");

if ($update) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil di edit', 'car' => [
        'id' => $id,
        'name' => $name,
        'brand' => $brand,
        'year' => $year,
        'price' => $price,
        'description' => $description,
        'image' => $imageName
    ]]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal mengedit data']);
}

$conn->close();
