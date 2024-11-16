<?php
// Logout functionality
if (isset($_POST['logout'])) {
    session_start(); // Start the session
    session_unset();  // Unset session variables
    session_destroy(); // Destroy the session
    header("Location: login.php"); // Redirect to login page after logout
    exit();
}
?>
