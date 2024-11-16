<?php
// Database connection 
$servername = "localhost";
$username = "root";
$password = "";
$database = "banana";
$port = 3308;  // specify the port number

// Create connection
$conn = new mysqli($servername, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
