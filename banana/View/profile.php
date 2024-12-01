<?php
include 'navigation.php';

include_once '../controller/update_profile.php';
include_once '../controller/profile_delete.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="../Static Assets/css/profile.css">
</head>
<body>
    <div class="container">
        <h1>User Profile</h1>
        
        <!-- Feedback Messages -->
        <?php
        if (isset($_SESSION['update_success'])) {
            echo "<p class='success'>{$_SESSION['update_success']}</p>";
            unset($_SESSION['update_success']);
        }
        if (isset($_SESSION['update_error'])) {
            echo "<p class='error'>{$_SESSION['update_error']}</p>";
            unset($_SESSION['update_error']);
        }
        if (isset($_SESSION['delete_success'])) {
            echo "<p class='success'>{$_SESSION['delete_success']}</p>";
            unset($_SESSION['delete_success']);
        }
        if (isset($_SESSION['delete_error'])) {
            echo "<p class='error'>{$_SESSION['delete_error']}</p>";
            unset($_SESSION['delete_error']);
        }
        ?>

        <form method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" value="<?php echo $_SESSION['username']; ?>" readonly>
            </div>
            <div class="form-group">
                <label for="new-password">New Password</label>
                <input type="password" id="new-password" name="password">
            </div>
            <div class="form-group">
                <label for="new-email">New Email</label>
                <input type="email" id="new-email" name="email">
            </div>
            <div class="btn-group">
                <button type="submit" name="update-btn">Update</button>
                <button type="submit" name="delete-btn">Delete</button>
                <button type="button" id="exit-btn" onclick="location.href='Home.php'">Exit</button>
            </div>
        </form>
    </div>
    <script src="../Static Assets/js/profile.js"></script>
</body>
</html>
