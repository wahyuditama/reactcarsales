<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/database.php");

// Ambil data dari POST
$name = $_POST['name'] ?? '';
$brand = $_POST['brand'] ?? '';
$year = $_POST['year'] ?? '';
$price = $_POST['price'] ?? '';
$description = $_POST['description'] ?? '';
$image = '';

// Handle file upload
if (!empty($_FILES['image']['name'])) {
    $image = $_FILES['image']['name'];
    $ext = array('PNG', 'JPEG', 'JPG');
    $extImage = pathinfo($image, PATHINFO_EXTENSION);

    if (!in_array(strtoupper($extImage), $ext)) {
        echo json_encode([
            "status" => "error",
            "message" => "Ekstensi tidak valid. Hanya PNG, JPEG, dan JPG yang diperbolehkan."
        ]);
        exit;
    } else {
        $uploadPath = '../../uploads/' . $image;
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            echo json_encode([
                "status" => "error",
                "message" => "Gagal mengupload gambar."
            ]);
            exit;
        }
    }
}

// Query insert
if ($image) {
    $sql = "INSERT INTO cars (name, brand, year, price, description, image) VALUES ('$name','$brand','$year','$price','$description','$image')";
} else {
    $sql = "INSERT INTO cars (name, brand, year, price, description) VALUES ('$name','$brand','$year','$price','$description')";
}

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Mobil berhasil ditambahkan!"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Gagal menambahkan mobil: " . mysqli_error($conn)
    ]);
}
