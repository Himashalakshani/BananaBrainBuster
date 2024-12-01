// Initialize game variables
let gameEnded = false;
let score = 0;
let timerInterval;
let correctSolution;
let remainingTime = 20;
let consecutiveCorrectAnswers = 0;  // Track consecutive correct answers
let successfulGames = 0;  // Track the number of consecutive successful games

const correctSound = new Audio('/banana/banana/Static%20Assets/assets/audio/correct.wav');
const wrongSound = new Audio('/banana/banana/Static%20Assets/assets/audio/wrong.mp3');
const dangerSound = new Audio('/banana/banana/Static%20Assets/assets/audio/danger-sound.mp3');

// Timer Update function
function updateTimer() {
    const timeSpan = document.getElementById("time-value");

    // Check if time is up
    if (remainingTime <= 0) {
        endGame("Time's up! You took too long to answer.", "timesUp");
        return;
    }

    // Update timer display
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeSpan.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    // Play danger sound continuously when the timer is running
    if (!dangerSound.paused && !gameEnded) {
        dangerSound.play();  // Play sound while the game is ongoing
    }

    // Decrement remaining time every second
    remainingTime -= 1;
}

// Start the game and timer
async function startGame() {
    // Reset game variables
    gameEnded = false;
    remainingTime = 20;

    // Play the danger sound immediately when the game starts
    dangerSound.loop = true;  // Set the sound to loop
    dangerSound.play();  // Start the sound right away

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
        endGame("An error occurred while fetching the question. Please try again later.", "error");
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

        // Track consecutive correct answers for Life Line
        consecutiveCorrectAnswers++;

        // Only show the popup after 5 consecutive correct answers
        if (consecutiveCorrectAnswers === 5) {
            showLifeLinePopup();  // Show Life Line pop-up
            consecutiveCorrectAnswers = 0;  // Reset consecutive correct answers after showing the popup
        } else {
            // Update the score display in the HTML
            document.getElementById("score-value").textContent = score;
            inputField.value = '';
            startGame(); // Fetch a new question and reset the timer
        }

        // Track the successful games (consecutive)
        successfulGames++;

        // Only show the "You won!" message after 5 consecutive successful games
        if (successfulGames === 5) {
            endGame("You won! You have earned a new Life Line!", "won");
            successfulGames = 0;  // Reset successful games counter after displaying the message
        }
    } else {
        wrongSound.play();
        endGame("Incorrect answer! Game over.", "loss");

        // Reset the successful games counter on failure
        successfulGames = 0;
    }
}

// Calculate bonus score based on time taken
function calculateBonusScore(timeTaken) {
    if (timeTaken <= 20 && timeTaken > 10) {
        return 1;
    } else if (timeTaken <= 10 && timeTaken > 5) {
        return 4;
    } else if (timeTaken <= 5) {
        return 5;
    } else {
        return 0;
    }
}

// End the game with different scenarios: loss, time's up, won
function endGame(message, resultType) {
    clearInterval(timerInterval);
    gameEnded = true;

    // Stop the danger sound when the game ends
    dangerSound.pause();
    dangerSound.currentTime = 0; // Reset the danger sound to the beginning

    let resultMessage = "";

    if (resultType === "loss") {
        resultMessage = "You lost! Incorrect answer.";
    } else if (resultType === "timesUp") {
        resultMessage = "Time's up! You took too long to answer.";
    } else if (resultType === "won") {
        resultMessage = "You won! You have earned a new Life Line!";
    }

    // Display the game-over screen with the result message
    document.getElementById("game-over-message").textContent = resultMessage;
    document.getElementById("game-over-score").textContent = score;
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// New Game Button Function
function newGame() {
    score = 0; // Reset score for new game
    consecutiveCorrectAnswers = 0; // Reset consecutive correct answers
    successfulGames = 0; // Reset consecutive successful games counter
    document.getElementById("score-value").textContent = score;
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    startGame();
}

// Quit Game Button Function
function quitGame() {
    window.location.href = "home.php";
}

// Show the Life Line pop-up when 5 consecutive correct answers are given
function showLifeLinePopup() {
    const overlay = document.getElementById("overlay");
    const popup = document.createElement("div");
    popup.classList.add("life-line-popup");

    // Add event listeners for the buttons
    document.getElementById("overlay").style.display = "block";
    overlay.appendChild(popup);

    document.getElementById("continue-btn").addEventListener("click", () => {
        overlay.style.display = "none";
        popup.remove();
        consecutiveCorrectAnswers = 0; // Reset consecutive correct answers
        startGame(); // Continue the game
    });

    document.getElementById("quit-btn").addEventListener("click", () => {
        window.location.href = "home.php"; // Quit the game and redirect
    });
}

// Initialize the game once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    startGame();
    document.getElementById("submit-btn").addEventListener("click", handleInput);
    document.getElementById("new-game-btn").addEventListener("click", newGame);
    document.getElementById("quit-btn").addEventListener("click", quitGame);
});
