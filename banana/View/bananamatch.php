<?php
include 'navigation.php'
  ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Memory Game</title>
  <link rel="stylesheet" type="text/css" href="../Static Assets/css/navigation.css">
  <link rel="stylesheet" type="text/css" href="../Static Assets/css/bananamatch.css">

</head>

<body>
  <!-- Score and Timer in the top-right corner -->
  <div id="score-timer" class="score-timer">
    <div id="score">
      Score: <span id="score-value">0</span>
    </div>

    <div id="timer">
      Time: <span id="time-value">1:00</span>
    </div>
  </div>

  <div class="game">
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon1.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon1.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>

    <div class="card" data-image="../Static%20Assets/assets/images/pokemon2.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon2.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>

    <div class="card" data-image="../Static%20Assets/assets/images/pokemon3.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon3.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>

    <div class="card" data-image="../Static%20Assets/assets/images/pokemon4.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon4.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>

    <div class="card" data-image="../Static%20Assets/assets/images/pokemon5.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon5.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    `
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon6.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="card" data-image="../Static%20Assets/assets/images/pokemon6.png">
      <div class="front"></div>
      <div class="back"></div>
    </div>
  </div>
  <div id="game-over-screen" style="display: none;">
    <h2>Game Over</h2>
    <p id="game-over-message">You have no lives left!</p>
    <p>Your Score: <span id="game-over-score">0</span></p>
    <div class="buttons">
        <button id="play-again-btn" class="button">Play Again</button>
        <button id="new-game-btn" class="button">New Game</button>
        <button id="quit-btn" class="button">Quit</button>
    </div>
</div>
  <div id="overlay" style="display: none;"></div>
  <script src="../Static Assets/js/bananamach.js"></script>
</body>

</html>