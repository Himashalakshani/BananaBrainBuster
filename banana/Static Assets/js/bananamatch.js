// Game Variables
let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCards = [];
let lockCard = false;
let matchedPairs = 0;
let currentRoundScore = 0;
let totalScore = parseInt(localStorage.getItem('score')) || 0;
let remainingTime = 60;
let timerInterval;

// Load sound effects
const correctSound = new Audio('../Static%20Assets/assets/audio/correct.wav');
const wrongSound = new Audio('../Static%20Assets/assets/audio/wrong.mp3');

// Shuffle the cards
function shuffle() {
  cardArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomIndex;
    card.children[1].style.backgroundImage = `url(${card.getAttribute("data-image")})`;
  });
}

// Flip a card
function flipCard() {
  if (lockCard || this.classList.contains("flip")) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// Check for a match
function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    playCorrectSound();
    matchedPairs++;
    disableCards();

    if (matchedPairs === 6) {
      setTimeout(() => {
        roundComplete();
      }, 500);
    }
  } else {
    playWrongSound();
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  flippedCards[0].removeEventListener("click", flipCard);
  flippedCards[1].removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip non-matched cards
function unflipCards() {
  lockCard = true;

  setTimeout(() => {
    flippedCards[0].classList.remove("flip");
    flippedCards[1].classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Reset the game board
function resetBoard() {
  flippedCards = [];
  lockCard = false;
}

// Play correct sound
function playCorrectSound() {
  correctSound.play();
}

// Play wrong sound
function playWrongSound() {
  wrongSound.play();
}

// Send score to the database
function saveScoreToDatabase(score) {
  fetch('../controller/score.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `score=${score}`,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Display success or error message from PHP
    })
    .catch((error) => {
      console.error('Error saving score:', error);
    });
}

// Start the game
function startGame() {
  shuffle();

  // Remove all flips
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });

  matchedPairs = 0;
  currentRoundScore = 0;
  remainingTime = 60;

  // Reset the score from localStorage or set to 0
  totalScore = parseInt(localStorage.getItem('score')) || 0;

  document.getElementById("score-value").textContent = totalScore;
  document.getElementById("time-value").textContent = "1:00";

  startTimer();
}

// Start the timer
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

// Update the timer
function updateTimer() {
  const timeSpan = document.getElementById("time-value");
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    endGame();
    return;
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeSpan.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  remainingTime--;
}

// Calculate the score for the current round
function calculateRoundScore() {
  const timeRemaining = remainingTime;

  if (timeRemaining > 30) {
    currentRoundScore = 5;
  } else if (timeRemaining > 20) {
    currentRoundScore = 4;
  } else if (timeRemaining > 10) {
    currentRoundScore = 3;
  } else if (timeRemaining > 0) {
    currentRoundScore = 1;
  } else {
    currentRoundScore = 0;
  }

  totalScore += currentRoundScore; // Update cumulative score
  updateScoreDisplay();

  // Store the updated total score in localStorage
  localStorage.setItem('score', totalScore);

  // Send the total score to the database
  saveScoreToDatabase(totalScore);
}

// Update the score display
function updateScoreDisplay() {
  document.getElementById("score-value").textContent = totalScore;
}

// Handle the completion of a round
function roundComplete() {
  calculateRoundScore();
  clearInterval(timerInterval);

  // Automatically restart the game for the next round
  startGame();
}

// End the game
function endGame() {
  calculateRoundScore(); // Ensure the final score is updated
  document.getElementById("game-over-message").textContent = "Time's up! Game Over.";
  document.getElementById("game-over-screen").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("game-over-score").textContent = `Total Score: ${totalScore}`;

  // Add event listeners for "Play Again" and "New Game"
  document.getElementById("play-again-btn").addEventListener("click", () => {
    window.location.href = "lifeline.php"; // Redirect to lifeline
  });

  document.getElementById("new-game-btn").addEventListener("click", () => {
    resetScore(); // Reset game state and score
    window.location.href = "bananamatch.php";  // Redirect to the new BananaMatch game page
  });
}

// Reset the total score
function resetScore() {
  totalScore = 0;
  localStorage.setItem('score', totalScore); // Clear the score in localStorage
  updateScoreDisplay(); // Update the UI
}

// Reset the game state
function resetGame() {
  matchedPairs = 0;
  remainingTime = 60;
  resetBoard(); // Reset flipped cards and other states

  // Remove all event listeners before starting a new game
  cards.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });

  // Shuffle and reset cards
  shuffle();
}

// Add event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  startGame();

  // New Game button resets the score and redirects to a fresh BananaMatch game page
  document.getElementById("new-game-btn").addEventListener("click", () => {
    resetScore(); // Reset score to 0
    window.location.href = "bananamatch.php";  // Redirect to the new banana game page
  });

  // Quit button resets the score and navigates back to the home page
  document.getElementById("quit-btn").addEventListener("click", () => {
    resetScore(); // Reset score to 0
    window.location.href = "home.php"; // Redirect to home page
  });
});
