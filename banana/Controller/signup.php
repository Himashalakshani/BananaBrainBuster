<?php
include 'db_connect.php';  // Include the database connection

session_start();

// Handle Sign In
if (isset($_POST['signIn'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];  // The password entered by the user

    // Ensure $conn is properly initialized before using it
    if ($conn) {
        // Check if the user exists
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            // User exists, check password
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {  // Use password_verify to check hashed password
                // Password correct, set session variables
                $_SESSION['id'] = $row['id'];  // Store user ID in session
                $_SESSION['username'] = $row['name'];  // Store username in session
                header("Location: ../View/home.php");  // Redirect to home page
                exit();
            } else {
                // Incorrect password
                $error_message = "Incorrect password.";
            }
        } else {
            // User doesn't exist
            $error_message = "Incorrect email or password.";
        }

        // If there's an error message, display it using JavaScript
        if (isset($error_message)) {
            echo "<script>alert('$error_message'); window.location.href='../view/login.php';</script>";
        }
    } else {
        // Handle case where db is not initialized
        echo "<script>alert('Database connection failed. Please try again later.');</script>";
    }
}

// Handle Sign Up
if (isset($_POST['signUp'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];  // The password entered by the user

    // Ensure $conn is properly initialized before using it
    if ($conn) {
        // Check if the email already exists
        $checkEmail = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($checkEmail);

        if ($result->num_rows > 0) {
            echo "<script>alert('Email Address Already Exists!'); window.location.href='../View/login.php';</script>";
        } else {
            // Hash the password before storing it
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert new user data
            $insertQuery = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashed_password')";

            if ($conn->query($insertQuery) === TRUE) {
                // Redirect to login page after successful sign-up
                header("Location: ../View/login.php");
                exit();
            } else {
                echo "<script>alert('Error: " . $conn->error . "'); window.location.href='../View/login.php';</script>";
            }
        }
    } else {
        // Handle case where db is not initialized
        echo "<script>alert('Database connection failed. Please try again later.');</script>";
    }
}
?>
