// Function to update date and time
function updateDateTime() {
    const currentDate = document.getElementById('currentDate');
    const currentTime = document.getElementById('currentTime');
    const now = new Date();
    const date = now.toLocaleDateString(); // e.g., '12/3/2024'
    const time = now.toLocaleTimeString(); // e.g., '3:45:30 PM'

    currentDate.textContent = `Date: ${date}`;
    currentTime.textContent = `Time: ${time}`;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initialize date and time on page load
updateDateTime();

// Navigate to game.php when "New Game" button is clicked
document.getElementById("newGame").addEventListener("click", function () {
    window.location.href = "game.php";
});
