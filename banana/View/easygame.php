<?php
include 'navigation.php'
    ?>
<!DOCTYPE html>
<html lang="en-gb">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Banana Game</title>
    <link rel="stylesheet" href="../Static Assets/css/banana.css">
    <link rel="stylesheet" href="../Static Assets/css/navigation.css">
</head>

<body>
    <br><br><br><br>

    <div id="game-container">
        <div id="game-content">
            <h1>The Banana Quiz</h1>

            <div id="question"></div> <!-- Question -->

            <div id="score-board">
                <span>Score: </span><span id="score-value">0</span> 
            </div>

            <div id="timer-container">
                <span id="timer-label">Time :</span>
                <span id="time-value">0:00</span>
            </div>

            <img id="question-image" src="https://www.sanfoh.com/uob/banana/data/t7474a643b918bf0eb2b310f5b7n18.png"
                alt="Banana Image">

            <div id="input-container">
                <input id="input" type="number" step="1" min="0" max="9" placeholder="Enter-" />
                <button id="submit-btn" class="button">Submit</button>
            </div>
        </div>
    </div>

    <div id="game-over-screen" style="display: none;">
        <h2>Game Over</h2>
        <p id="game-over-message"></p>
        <p>Your Score: <span id="game-over-score">0</span></p>
        <button id="new-game-btn" class="button">New Game</button>
        <button id="quit-btn" class="button">Quit Game</button>
    </div>

    <div id="overlay" style="display: none;"></div>

    <script src="../Static Assets/js/easygame.js"></script>
</body>

</html>