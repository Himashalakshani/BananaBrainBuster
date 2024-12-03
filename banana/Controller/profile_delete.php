<?php
include_once '../controller/db_connect.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

// Retrieve username from session
$username = $_SESSION['username'];

// Handle delete request
if (isset($_POST['delete-btn'])) {
    $stmt = $conn->prepare("DELETE FROM users WHERE name = ?");
    $stmt->bind_param("s", $username);

    if ($stmt->execute()) {
        // Deletion successful
        $_SESSION['delete_success'] = "Your profile has been deleted successfully.";
        
        // Destroy session and redirect to login page
        session_destroy();
        $stmt->close();
        $conn->close();
        header('Location: login.php');
        exit();
    } else {
        // Deletion failed
        $_SESSION['delete_error'] = "Error deleting your profile: " . $stmt->error;
        $stmt->close();
        $conn->close();
        header('Location: profile.php');
        exit();
    }
}
?>
