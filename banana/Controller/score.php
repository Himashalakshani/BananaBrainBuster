<?php

include 'db_connect.php';

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Get the username from the session if available
$username = isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : 'Guest';

// Get the score from POST data
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;

// Validate score
if ($score < 0) {
    echo "Invalid score";
    exit;
}

// Prepare and execute the SQL statement to prevent SQL injection
$sql = $conn->prepare("INSERT INTO scores (username, score) VALUES (?, ?)");
$sql->bind_param("si", $username, $score);

if ($sql->execute()) {
    echo "Score stored successfully";
} else {
    echo "Error: " . $conn->error;
}

$sql->close();
$conn->close();

?>
