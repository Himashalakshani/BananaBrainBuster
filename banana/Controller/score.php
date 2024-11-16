<?php

include 'db_connect.php';

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Get the username from the session if available
$username = isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : 'Guest';

// Get score from POST data
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;

// Insert score into database
$sql = "INSERT INTO scores (username, score) VALUES ('$username', '$score')";

if ($conn->query($sql) === TRUE) {
    echo "Score stored successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close(); // Close the database connection
?>
