
// Game Variables
let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCards = []; // Track flipped cards
let lockCard = false; // Prevent flipping when two cards are being checked
let matchedPairs = 0; // Track the number of matched pairs
let score = 0; // Track the score
let remainingTime = 60; // Timer in seconds
let timerInterval; // Timer interval for countdown

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
  if (lockCard || this.classList.contains("flip")) return; // Prevent flipping the same card

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
    playCorrectSound(); // Play correct sound
    matchedPairs++; // Increment matched pairs
    disableCards();
    if (matchedPairs === 6) { // Check if all 6 pairs (12 cards) are matched
      setTimeout(() => {
        showGameWonScreen(); // Show the "Game Won" screen
      }, 500); // Small delay to allow sound
    }
  } else {
    playWrongSound(); // Play wrong sound
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
  flippedCards = []; // Clear flipped cards
  lockCard = false; // Unlock card flipping
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
    card.classList.remove("flip"); // Make sure all cards are hidden when starting
    card.addEventListener("click", flipCard);
  });

  // Reset variables
  matchedPairs = 0;
  score = 0;
  remainingTime = 60;

  document.getElementById("score-value").textContent = score;
  document.getElementById("time-value").textContent = "1:00";

  // Start the timer
  startTimer();
}

// Start the timer
function startTimer() {
  clearInterval(timerInterval); // Clear any existing interval to avoid duplication
  timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}

// Update the timer
function updateTimer() {
  const timeSpan = document.getElementById("time-value");
  if (remainingTime <= 0) {
    clearInterval(timerInterval); // Stop the timer
    endGame("Time's up! Game over."); // Trigger game over if time runs out
    return;
  }

  // Format the time as mm:ss
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeSpan.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  remainingTime--;
}

// Calculate final score based on remaining time
function calculateFinalScore() {
  const timeRemaining = remainingTime; // Remaining time when game ends

  // Assign score based on remaining time
  if (timeRemaining > 30) {
    score = 5;  
  } else if (timeRemaining > 20) {
    score = 4; 
  } else if (timeRemaining > 10) {
    score = 3; 
  } else if (timeRemaining > 0) {
    score = 1; 
  } else {
    score = 0; 
  }

  updateScore(); // Update score display
}

// Show the game won screen
function showGameWonScreen() {
  calculateFinalScore(); // Calculate score based on remaining time
  clearInterval(timerInterval); // Stop the timer
  document.getElementById("game-over-message").textContent = "You won the game!";
  document.getElementById("game-over-screen").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("game-over-score").textContent = `Final Score: ${score}`;
}

// Show the game over screen with a "Time's Up!" message
function endGame(message) {
  calculateFinalScore(); // Calculate score based on remaining time
  document.getElementById("game-over-message").textContent = message;
  document.getElementById("game-over-screen").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("game-over-score").textContent = `Final Score: ${score}`;

  // Flip all cards back to hide them when game ends
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
}

// Update the score display on the screen
function updateScore() {
  document.getElementById("score-value").textContent = score;
}

// New Game Button Function
function newGame() {
  clearInterval(timerInterval); // Clear any existing timer
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  startGame(); // Start a new game and shuffle the cards
}

// Start the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  startGame();
  document.getElementById("new-game-btn").addEventListener("click", newGame);
});
