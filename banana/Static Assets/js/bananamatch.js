// Game Variables
let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;

// Load sound effects
const correctSound = new Audio('../Static%20Assets/assets/audio/correct.wav');
const wrongSound = new Audio('../Static%20Assets/assets/audio/wrong.mp3');

// Shuffle the cards
function shuffle() {
  cardArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomIndex;
    card.children[1].style.backgroundImage = `url(${card.getAttribute(
      "data-image"
    )})`;
  });
}

// Flip a card
function flipCard() {
  if (lockCard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!flippedCard) {
    // First card flipped
    flippedCard = true;
    firstCard = this;
    return;
  }

  // Second card flipped
  secondCard = this;
  checkForMatch();
}

// Check for a match
function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    playCorrectSound(); // Play correct sound
    disableCards();
  } else {
    playWrongSound(); // Play wrong sound
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip non-matched cards
function unflipCards() {
  lockCard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Reset the game board
function resetBoard() {
  [flippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
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
}

startGame();
