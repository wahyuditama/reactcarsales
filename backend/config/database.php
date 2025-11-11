<?php

$host = "localhost";
$user = "root";
$pass = "";
$db = "car_sale";

$conn = mysqli_connect($host, $user, $pass, $db);
if (mysqli_connect_errno()) {
    echo "Data Error" . mysqli_connect_error();
}
