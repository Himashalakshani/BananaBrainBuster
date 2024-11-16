<?php
include 'db_connect.php';

session_start();

if (isset($_POST['signIn'])) {
    $email = $_POST['email'];
    $password = md5($_POST['password']); // Hash the password

    // Query to check user credentials
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            // User exists, check password
            $row = $result->fetch_assoc();
            if ($row['password'] == $password) {
                // Password correct, store username in session and redirect to home page
                $_SESSION['username'] = $row['name'];
                header("Location: ../view/home.php");
                exit();
            } else {
                // Incorrect password
                $error_message = "Incorrect password.";
            }
        } else {
            // User doesn't exist
            $error_message = "Incorrect email or password.";
        }
    } else {
        // Error executing SQL statement
        $error_message = "An error occurred. Please try again later.";
    }

    // If there's an error message, display it using JavaScript alert
    if (isset($error_message)) {
        echo "<script>alert('$error_message'); window.location.href='../view/login.php';</script>";
    }
}

if (isset($_POST['signUp'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = md5($_POST['password']); // Hash the password

    // Check if email already exists
    $checkEmail = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($checkEmail);

    if ($result->num_rows > 0) {
        echo "<script>alert('Email Address Already Exists!'); window.location.href='../view/login.php';</script>";
    } else {
        // Insert new user data
        $insertQuery = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
        
        if ($conn->query($insertQuery) === TRUE) {
            // Redirect to sign-in page after successful sign-up
            header("Location: ../view/login.php"); 
        } else {
            echo "<script>alert('Error: " . $conn->error . "'); window.location.href='../view/login.php';</script>";
        }
    }
}
?>
