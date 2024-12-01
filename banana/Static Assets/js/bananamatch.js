// Game Variables
let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCards = [];
let lockCard = false;
let matchedPairs = 0;
let currentRoundScore = 0; // Score for the current round
let totalScore = 0; // Cumulative score across rounds
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

// Start the game
function startGame() {
  shuffle();
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });

  matchedPairs = 0;
  currentRoundScore = 0;
  remainingTime = 60;

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
    window.location.href = "lifeline.php"; // Redirect to lifeline game
  });

  document.getElementById("new-game-btn").addEventListener("click", () => {
    location.reload(); // Refresh the page to reset the game
  });
}

// Add event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  startGame();
  document.getElementById("new-game-btn").addEventListener("click", startGame);
  document.getElementById("quit-btn").addEventListener("click", () => {
    window.location.href = "home.php";
  });
});
