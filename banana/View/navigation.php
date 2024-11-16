<?php
// Start the session if it hasn't been started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<?php include '../controller/logout.php'; ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navigation Bar</title>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="../Static Assets/css/navigation.css">
</head>

<body>
    <nav>
        <div class="nav-left">
            <h1 class="header">Banana Brain Buster</h1>
        </div>
        <ul class="nav-links">
            <li><a href="home.php" class="center">Home</a></li>
            <li><a href="instructions.php" class="upward">Instructions </a></li>
            <li><a href="leader.php" class="forward">Leader Board</a></li>
            <li><a href="profile.php" class="forward2">Profile</a></li>

            <?php if (isset($_SESSION['username'])): ?>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle">Hi, <?php echo htmlspecialchars($_SESSION['username']); ?></a>
                    <div class="dropdown-content">
                        <form method="post">
                            <button type="submit" class="logout-button" name="logout">Logout</button>
                        </form>
                    </div>
                </li>
            <?php else: ?>
                <li><button class="login-button">Login</button></li>
            <?php endif; ?>
        </ul>
    </nav>

    <script src="../Static Assets/js/nav.js"></script>
</body>

</html>