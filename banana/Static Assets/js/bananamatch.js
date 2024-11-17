

// Game Variables
let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCards = []; // Track flipped cards
let lockCard = false; // Prevent flipping when two cards are being checked
let score = 0; // Initialize score
let startTime; // To track the start time of the game
let remainingTime = 60; // Timer in seconds
let timerInterval; // Timer interval for countdown
let matchedPairs = 0; // Track the number of matched pairs

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
    if (matchedPairs === 8) {  // Check if it's the last pair
      setTimeout(() => {
        calculateFinalScore(); // Calculate final score when all cards are matched
        showGameOverScreen(); // Show the game over screen when the game is done
      }, 500); // Small delay to allow sound to play
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
  cards.forEach((card) => card.addEventListener("click", flipCard));

  // Track the start time of the game
  startTime = Date.now();
  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);
}

// Update the timer
function updateTimer() {
  const timeSpan = document.getElementById("time-value");
  if (remainingTime <= 0) {
    clearInterval(timerInterval); // Stop the timer
    endGame("Time's up! You ran out of time.");
    return;
  }

  // Format the time as mm:ss
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeSpan.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  remainingTime--;
}

// Show the game over screen
function showGameOverScreen() {
  const message = (remainingTime > 0) ? `You won the game!` : `Time's up!`;
  document.getElementById("game-over-message").textContent = message;
  document.getElementById("game-over-screen").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// Calculate the final score based on the time taken when the game is over
function calculateFinalScore() {
  const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate the time in seconds

  let finalScore = 0;

  // Calculate score based on how fast the player finished
  if (timeTaken <= 30) {
    finalScore = 5; // 5 points if finished within 30 seconds
  } else if (timeTaken <= 40) {
    finalScore = 4; // 4 points if finished within 40 seconds
  } else if (timeTaken <= 50) {
    finalScore = 3; // 3 points if finished within 50 seconds
  } else if (timeTaken <= 60) {
    finalScore = 1; // 1 point if finished within 60 seconds
  } else {
    finalScore = 0; // Game over if finished after 60 seconds
  }

  // Update the score display with the final score after the game is over
  document.getElementById("game-over-score").textContent = `Final Score: ${finalScore}`;
}

// End the game if time runs out
function endGame(message) {
  document.getElementById("game-over-message").textContent = message;
  document.getElementById("game-over-score").textContent = `Final Score: 0`; // No score if time runs out
  document.getElementById("game-over-screen").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// New Game Button Function
function newGame() {
  score = 0; // Reset score for new game
  matchedPairs = 0; // Reset matched pairs count
  remainingTime = 60; // Reset timer
  document.getElementById("score-value").textContent = score;
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  startGame();
}

// Quit Game Button Function
function quitGame() {
  window.location.href = "home.php";
}

// Start the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  startGame();
  document.getElementById("new-game-btn").addEventListener("click", newGame);
  document.getElementById("quit-btn").addEventListener("click", quitGame);
});
