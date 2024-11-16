<?php
 include 'navigation.php' 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../Static Assets/css/nav.css">
    <link rel="stylesheet" type="text/css" href="../Static Assets/css/game.css">
    <title>Select Game Character</title>
</head>

<body>
    <div class="container">
        <div class="card">
            <div class="card-image">
                <img src="../Static Assets/assets/images/img1.png" alt="easy mode">
            </div>
            <div class="card-body">
                <span class="power">Easy Mode</span>
                <h2>Banana Match</h2>
                <p>Find pairs of matching cards in this fun card-matching game!</p>
            </div>
            <div class="selector">
                <button onclick="redirectToPage('bananamatch.php')">go with this!</button>
            </div>

        </div>

        <div class="card">
            <div class="card-image">
                <img src="../Static Assets/assets/images/img2.png" alt="hard mode">
            </div>
            <div class="card-body">
                <span class="power">Hard Mode</span>
                <h2>Banana Quiz</h2>
                <p>Answer a variety of maths questions in this engaging quiz!</p>
            </div>
            <div class="selector">
                <button onclick="redirectToPage('banana.php')">go with this!</button>
            </div>
        </div>

        <div class="card">
            <div class="card-image">
                <img src="../Static Assets/assets/images/img3.png" alt="challenge  mode">
            </div>
            <div class="card-body">
                <span class="power">Challenge Mode</span>
                <h2>Banana Blitz</h2>
                <p>Tackle tougher maths problems to challenge your skills!</p>
            </div>
            <div class="selector">
                <button onclick="redirectToPage('bananablitz.php')">go with this!</button>
            </div>
        </div>


    </div>

</body>
<script src="../Static Assets/js/game.js"></script>


</html>