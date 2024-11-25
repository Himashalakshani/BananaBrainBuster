// Initialize game variables
let startTime;
let gameEnded = false;
let score = 0;
let timerInterval;
let matchedPairs = 0; // Track the number of matched pairs
const totalPairs = 5; // Total number of pairs to match in the game

const correctSound = new Audio('/banana/banana/Static%20Assets/assets/audio/correct.wav');
const wrongSound = new Audio('/banana/banana/Static%20Assets/assets/audio/wrong.mp3');

// Timer Update function
function updateTimer() {
    const timeSpan = document.getElementById("time-value");
    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
    const minutes = Math.floor(timeTaken / 60); // Minutes
    const seconds = timeTaken % 60; // Seconds
    timeSpan.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds; // Display as minutes:seconds

    // End the game if the user takes more than 60 seconds
    if (timeTaken > 60) {
        endGame("Time's up! You took too long to finish the game.");
    }
}

// Start the game and timer
function startGame() {
    // Reset game variables
    gameEnded = false;
    matchedPairs = 0; // Reset matched pairs counter
    score = 0; // Reset score
    document.getElementById("score-value").textContent = score; // Reset score display

    // Start the timer
    startTime = Date.now();

    // Clear any existing interval to avoid multiple timers
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000); // Call updateTimer every second

    // Reset card states (add your logic to reset the board here)
    resetCards();
}

// Reset all cards (implement your logic to reset the board)
function resetCards() {
    const cards = document.querySelectorAll('.card'); // Assuming all cards have the class "card"
    cards.forEach(card => {
        card.classList.remove('matched', 'flipped'); // Remove matched or flipped states
        card.addEventListener('click', handleCardClick); // Reattach event listeners
    });
}

// Handle card clicks
function handleCardClick(event) {
    if (gameEnded) return; // Don't process clicks if the game is over

    const card = event.target;

    // Check if the card is already matched or flipped
    if (card.classList.contains('matched') || card.classList.contains('flipped')) {
        return;
    }

    // Flip the card
    card.classList.add('flipped');

    // Check for a match (implement your match-checking logic here)
    const flippedCards = document.querySelectorAll('.card.flipped');
    if (flippedCards.length === 2) {
        checkForMatch(flippedCards);
    }
}

// Check for a match between two flipped cards
function checkForMatch(flippedCards) {
    const [card1, card2] = flippedCards;

    // Check if the cards match (replace with your matching logic)
    if (card1.dataset.value === card2.dataset.value) {
        // Cards match
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate time taken
        const bonusScore = calculateBonusScore(timeTaken); // Get bonus score
        score += bonusScore; // Update total score
        document.getElementById("score-value").textContent = score; // Update score display

        correctSound.play();

        // Check if all pairs are matched
        if (matchedPairs === totalPairs) {
            endGame(`Congratulations! You matched all pairs. Your score is ${score}.`);
        }
    } else {
        // Cards don't match
        wrongSound.play();

        // Flip the cards back after a short delay
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
}

// Calculate bonus score based on time taken
function calculateBonusScore(timeTaken) {
    if (timeTaken <= 30) {
        return 5;
    } else if (timeTaken <= 40) {
        return 4;
    } else if (timeTaken <= 50) {
        return 3;
    } else if (timeTaken <= 60) {
        return 1;
    } else {
        return 0; // No score if time exceeds 60 seconds
    }
}

// End the game
function endGame(message) {
    clearInterval(timerInterval); // Stop the timer
    gameEnded = true; // Set game state to ended

    // Display the game-over screen
    document.getElementById("game-over-message").textContent = message;
    document.getElementById("game-over-score").textContent = score; // Show the score in the game over screen
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// New Game Button Function
function newGame() {
    document.getElementById("game-over-screen").style.display = "none"; // Hide game-over screen
    document.getElementById("overlay").style.display = "none"; // Hide overlay
    startGame(); // Start a new game
}

// Quit Game Button Function
function quitGame() {
    window.location.href = "home.php"; // Redirect to home or any desired page
}

// Initialize the game once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    startGame();
    document.getElementById("new-game-btn").addEventListener("click", newGame); // New game button listener
    document.getElementById("quit-btn").addEventListener("click", quitGame); // Quit game button listener
});
