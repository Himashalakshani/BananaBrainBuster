<?php
include 'navigation.php';
include '../controller/db_connect.php'; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="../Static Assets/css/leader.css">
</head>
<body>
    <br><br>
    <h2 style="text-align: center;">Leaderboard</h2>

    <table class="leaderboard">
        <tr>
            <th class="place">Place</th>
            <th class="name">Name</th>
            <th class="score">Score</th>
        </tr>

        <?php
        // Query to get users' highest scores from the 'scores' table
        $query = "SELECT username, MAX(score) AS highest_score FROM scores GROUP BY username ORDER BY highest_score DESC LIMIT 10";
        $result = mysqli_query($conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $place = 1; // Initialize position
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr>";
                echo "<td class='place'>" . $place++ . "</td>";
                echo "<td class='name'>" . htmlspecialchars($row['username']) . "</td>";
                echo "<td class='score'>" . htmlspecialchars($row['highest_score']) . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='3' style='text-align: center;'>No scores available</td></tr>";
        }

        // Close the database connection
        mysqli_close($conn);
        ?>
    </table>
</body>
</html>
