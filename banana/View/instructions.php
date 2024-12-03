<?php
include 'navigation.php';

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    // Redirect the user to the login page or display a message
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>instructions</title>
    
</head>
<link rel="stylesheet" href="../Static Assets/css/instructions.css">
<body>

<div class="container">
<h2>instructions </h2>
    <div class="gallery">
        <?php
        error_reporting(E_ALL); // Enable error reporting
        // Path to the directory containing images
        $directory = "../Static Assets/assets/images/instructions";

        // Open a directory handle
        if ($handle = opendir($directory)) {
            // Loop through the directory
            while (false !== ($file = readdir($handle))) {
                // Check if the file is an image
                if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), array("jpg", "jpeg", "png", "gif"))) {
                    // Output HTML to display the image
                    echo '<img src="' . $directory . '/' . $file . '" alt="' . $file . '">';
                }
            }
            // Close the directory handle
            closedir($handle);
        } else {
            echo "Failed to open directory: $directory";
        }
        ?>
    </div>
</div>

</body>
</html>
