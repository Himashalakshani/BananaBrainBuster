// Initialize game variables
let gameEnded = false;
let score = 0;
let timerInterval;
let correctSolution; 
let remainingTime = 20; 

const correctSound = new Audio('/banana/banana/Static%20Assets/assets/audio/correct.wav');
const wrongSound = new Audio('/banana/banana/Static%20Assets/assets/audio/wrong.mp3');
const dangerSound = new Audio('/banana/banana/Static%20Assets/assets/audio/danger-sound.mp3'); 

// Timer Update function
function updateTimer() {
    const timeSpan = document.getElementById("time-value");

    // Check if time is up
    if (remainingTime <= 0) {
        endGame("Time's up! You took too long to answer.");
        return; 
    }

    // Update timer display
    const minutes = Math.floor(remainingTime / 60); 
    const seconds = remainingTime % 60; 
    timeSpan.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds; 

   // Play danger sound when time is low (20 seconds or less)
 if (remainingTime <= 20 && remainingTime > 0) {
    dangerSound.play();
}

    // Decrement remaining time every second
    remainingTime -= 1;
}

// Start the game and timer
async function startGame() {
    // Reset game variables
    gameEnded = false;
    remainingTime = 20; 

    // Fetch a new question from the API
    await fetchNewQuestion();

    // Clear any existing interval to avoid multiple timers
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000); 
}

// Fetch a new question from the API
async function fetchNewQuestion() {
    try {
        const response = await fetch('../Controller/proxy.php'); 
        if (!response.ok) throw new Error("Failed to fetch question");

        const data = await response.json();
        
        // Update the image and solution
        document.getElementById("question-image").src = data.question; 
        correctSolution = parseInt(data.solution); 
    } catch (error) {
        console.error("Error fetching the question:", error);
        endGame("An error occurred while fetching the question. Please try again later.");
    }
}

// Handle input and score
function handleInput() {
    if (gameEnded) return; 

    const inputField = document.getElementById("input");
    const userInput = parseInt(inputField.value);

    if (isNaN(userInput)) {
        alert("Please enter a valid number!"); 
        return;
    }

    // Stop the timer and any currently playing sounds
    clearInterval(timerInterval); 
    dangerSound.pause(); 
    dangerSound.currentTime = 0; // Reset the danger sound to the beginning

    const timeTaken = 20 - remainingTime; 

    if (userInput === correctSolution) {
        const bonusScore = calculateBonusScore(timeTaken); 
        score += bonusScore; 
        console.log("Correct! Bonus Score:", bonusScore, "Total Score:", score); 

        correctSound.play();

        // Update the score display in the HTML
        document.getElementById("score-value").textContent = score; 
        inputField.value = '';
        startGame(); // Fetch a new question and reset the timer
    } else {
        wrongSound.play();
        endGame("Incorrect answer! Game over."); 
    }
}

// Calculate bonus score based on time taken
function calculateBonusScore(timeTaken) {
    if (timeTaken <= 20 && timeTaken >10 ) {
        return 1; 
    } else if (timeTaken <= 10 && timeTaken >5 ) {
        return 4; 
    } else if (timeTaken <= 5) {
        return 5; 
    } else {
        return 0;
    }
}

// End the game
function endGame(message) {
    clearInterval(timerInterval); 
    gameEnded = true; 

    // Display the game-over screen
    document.getElementById("game-over-message").textContent = message;
    document.getElementById("game-over-score").textContent = score; 
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// New Game Button Function
function newGame() {
    score = 0; // Reset score for new game
    document.getElementById("score-value").textContent = score; 
    document.getElementById("game-over-screen").style.display = "none"; 
    document.getElementById("overlay").style.display = "none"; 
    startGame(); 
}

// Quit Game Button Function
function quitGame() {
    window.location.href = "home.php"; 
}

// Initialize the game once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    startGame();
    document.getElementById("submit-btn").addEventListener("click", handleInput);
    document.getElementById("new-game-btn").addEventListener("click", newGame); 
    document.getElementById("quit-btn").addEventListener("click", quitGame);
});
