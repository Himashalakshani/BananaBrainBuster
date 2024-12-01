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

// Handle form submission for update
if (isset($_POST['update-btn'])) {
    // Get updated data from the form
    $new_password = $_POST['password'];
    $new_email = $_POST['email'];

    // Validate inputs
    if (empty($new_password) && empty($new_email)) {
        $_SESSION['update_error'] = "Please provide at least one field to update.";
        header('Location: profile.php');
        exit();
    }

    // Prepare the SQL query with placeholders
    $query = "UPDATE users SET ";
    $params = [];
    $types = "";

    if (!empty($new_password)) {
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
        $query .= "password = ?, ";
        $params[] = $hashed_password;
        $types .= "s";
    }

    if (!empty($new_email)) {
        $query .= "email = ?, ";
        $params[] = $new_email;
        $types .= "s";
    }

    // Remove trailing comma and add WHERE clause
    $query = rtrim($query, ', ') . " WHERE name = ?";
    $params[] = $username;
    $types .= "s";

    // Execute the query using prepared statements
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        $_SESSION['update_success'] = "Profile updated successfully.";

        // Update session username if email was updated
        if (!empty($new_email)) {
            $_SESSION['username'] = $username;
        }
    } else {
        $_SESSION['update_error'] = "Error updating profile: " . $stmt->error;
    }

    // Redirect back to profile page
    $stmt->close();
    $conn->close();
    header('Location: profile.php');
    exit();
}
?>
