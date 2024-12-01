// Initialize game variables
let gameEnded = false;
let score = 0;
let timerInterval;
let correctSolution;
let remainingTime = 20;
let consecutiveCorrectAnswers = 0;
let successfulGames = 0;

const correctSound = new Audio('/banana/banana/Static%20Assets/assets/audio/correct.wav');
const wrongSound = new Audio('/banana/banana/Static%20Assets/assets/audio/wrong.mp3');
const dangerSound = new Audio('/banana/banana/Static%20Assets/assets/audio/danger-sound.mp3');
const timeUpSound = new Audio('/banana/banana/Static%20Assets/assets/audio/time-up-sound.mp3');

// Preload sounds to ensure they are ready
correctSound.load();
wrongSound.load();
dangerSound.load();
timeUpSound.load();

// Timer update function
function updateTimer() {
    const timeSpan = document.getElementById("time-value");
    if (remainingTime <= 0) {
        timeUpSound.play();  // Play time up sound
        endGame("Time's up! You took too long to answer.", "timesUp");
        return;
    }
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeSpan.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    remainingTime -= 1;
}

// Start the game and timer
async function startGame() {
    gameEnded = false;
    remainingTime = 20;

    // Preload sounds
    correctSound.load();
    wrongSound.load();
    dangerSound.load();
    timeUpSound.load();

    // Reset danger sound to not loop
    dangerSound.loop = false;
    dangerSound.currentTime = 0; // Reset danger sound before playing

    await fetchNewQuestion();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Fetch a new question
async function fetchNewQuestion() {
    try {
        const response = await fetch('../Controller/proxy.php');
        if (!response.ok) throw new Error("Failed to fetch question");
        const data = await response.json();
        document.getElementById("question-image").src = data.question;
        correctSolution = parseInt(data.solution);

        // Wait for 1 second before starting the danger sound
        setTimeout(() => {
            dangerSound.currentTime = 0; // Reset the sound to start from the beginning
            dangerSound.play();  // Start the danger sound
            dangerSound.loop = true;  // Loop the danger sound
        }, 1000);  // Delay of 1 second

    } catch (error) {
        endGame("An error occurred while fetching the question. Please try again.", "error");
    }
}

// Handle input
function handleInput() {
    if (gameEnded) return;
    const inputField = document.getElementById("input");
    const userInput = parseInt(inputField.value);

    if (isNaN(userInput)) {
        alert("Please enter a valid number!");
        return;
    }

    clearInterval(timerInterval);  // Stop timer when input is received
    const timeTaken = 20 - remainingTime;

    if (userInput === correctSolution) {
        const bonusScore = calculateBonusScore(timeTaken);
        score += bonusScore;
        document.getElementById("score-value").textContent = score;
        consecutiveCorrectAnswers++;
        successfulGames++;

        correctSound.play();  // Play correct sound
        dangerSound.pause();  // Stop danger sound

        if (successfulGames === 5) {
            endGame("You won! You have earned a new Life Line!", "won");
        } else if (consecutiveCorrectAnswers === 5) {
            showLifeLinePopup();
        } else {
            startGame();
        }
    } else {
        wrongSound.play();  // Play wrong sound
        dangerSound.pause();  // Stop danger sound
        endGame("Incorrect answer! Game over.", "loss");
        successfulGames = 0;
    }
}

// Calculate bonus score
function calculateBonusScore(timeTaken) {
    if (timeTaken <= 5) return 5;
    if (timeTaken <= 10) return 4;
    if (timeTaken <= 20) return 1;
    return 0;
}

// End game
function endGame(message, resultType) {
    clearInterval(timerInterval);
    gameEnded = true;
    if (resultType !== "timesUp") {
        timeUpSound.pause();  // Stop the time up sound when game ends before time runs out
    }
    
    // Stop the danger sound after 1 second delay when the game ends
    setTimeout(() => {
        dangerSound.pause();  // Stop danger sound from looping
    }, 1000);  // Delay of 1 second before stopping the sound

    if (resultType === "won") {
        showLifeLinePopup();
    } else {
        const overlay = document.getElementById("overlay");
        const gameOverScreen = document.getElementById("game-over-screen");
        document.getElementById("game-over-message").textContent = message;
        document.getElementById("game-over-score").textContent = score;
        overlay.style.display = "flex";
        gameOverScreen.style.display = "block";
    }
}

// Show Life Line Popup
function showLifeLinePopup() {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("life-line-popup");
    overlay.style.display = "flex";
    popup.style.display = "block";

    document.getElementById("continue-btn").onclick = () => {
        window.location.href = "bananamatch.php";
    };
    document.getElementById("quit-btn").onclick = () => {
        window.location.href = "home.php";
    };
}

// Restart game
function newGame() {
    score = 0;
    consecutiveCorrectAnswers = 0;
    successfulGames = 0;
    document.getElementById("score-value").textContent = score;
    document.getElementById("overlay").style.display = "none";
    document.getElementById("game-over-screen").style.display = "none";
    startGame();
}

// Quit game
function quitGame() {
    window.location.href = "home.php";
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    startGame();
    document.getElementById("submit-btn").addEventListener("click", handleInput);
    document.getElementById("new-game-btn").addEventListener("click", newGame);
    document.getElementById("quit-btn").addEventListener("click", quitGame);
});
