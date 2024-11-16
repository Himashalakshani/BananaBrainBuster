// Initialize game variables
let startTime;
let gameEnded = false;
let score = 0;
let timerInterval;
let correctSolution; // Store the correct solution from the API

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
        endGame("Time's up! You took too long to answer.");
    }
}

// Start the game and timer
async function startGame() {
    // Reset game variables
    gameEnded = false;

    // Fetch a new question from the API
    await fetchNewQuestion();

    // Start the timer
    startTime = Date.now();
    
    // Clear any existing interval to avoid multiple timers
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000); // Call updateTimer every second
}

// Fetch a new question from the API
async function fetchNewQuestion() {
    try {
        const response = await fetch('../Controller/proxy.php'); // Call the proxy PHP file
        if (!response.ok) throw new Error("Failed to fetch question");

        const data = await response.json();
        
        // Update the image and solution
        document.getElementById("question-image").src = data.question; // Assuming an <img id="question-image">
        correctSolution = parseInt(data.solution); // Store solution for later comparison
    } catch (error) {
        console.error("Error fetching the question:", error);
        endGame("An error occurred while fetching the question. Please try again later.");
    }
}

// Handle input and score
function handleInput() {
    if (gameEnded) return; // Don't process input if game is over

    const inputField = document.getElementById("input");
    const userInput = parseInt(inputField.value);

    if (isNaN(userInput)) {
        alert("Please enter a valid number!"); // Optionally keep alert for invalid input
        return;
    }

    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate time taken for this question

    if (userInput === correctSolution) {
        const bonusScore = calculateBonusScore(timeTaken); // Get bonus score
        score += bonusScore; // Update total score
        console.log("Correct! Bonus Score:", bonusScore, "Total Score:", score); // Debugging log

        correctSound.play();

        // Update the score display in the HTML
        document.getElementById("score-value").textContent = score; // Correctly update the score on the screen

        inputField.value = ''; // Reset input field
        startGame(); // Fetch a new question and reset the timer
    } 
    else {
        wrongSound.play();

        endGame("Incorrect answer! Game over."); // Directly end the game without showing alert
    }
}

// Calculate bonus score based on time taken
function calculateBonusScore(timeTaken) {
    if (timeTaken <= 10) {
        return 5;
    } else if (timeTaken <= 20) {
        return 4;
    } else if (timeTaken <= 30) {
        return 3;
    } else if (timeTaken <= 40) {
        return 2;
    } else if (timeTaken <= 60) {
        return 1;
    } else {
        endGame("Time's up! You took too long to answer.");
        return 0;
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
    score = 0; // Reset score for new game
    document.getElementById("score-value").textContent = score; // Update score display
    document.getElementById("game-over-screen").style.display = "none"; // Hide game over screen
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
    document.getElementById("submit-btn").addEventListener("click", handleInput);
    document.getElementById("new-game-btn").addEventListener("click", newGame); // New game button listener
    document.getElementById("quit-btn").addEventListener("click", quitGame); // Quit game button listener
});
