"use strict";
// Select Elements
// Players
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
// Player scores
const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");
// Player current score
const current0El = document.getElementById("current-0");
const current1El = document.getElementById("current-1");
// Dice
const diceEl = document.querySelector(".dice");
// Buttons
// const btnNew = document.querySelector(".btn-new");
const btnRole = document.querySelectorAll(".btn-roll");
const btnHold = document.querySelectorAll(".btn-hold");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting Conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  btnRole[0].disabled = true;
  btnHold[0].disabled = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Remove winner class
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove("player-winner");

  // Remove active classes & set  player 1 to active
  diceEl.classList.add("hidden");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");
};

const openModal = function () {
  console.log("timmy");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const winner = function () {
  playing = false;
  diceEl.classList.add("hidden");

  // ?Player win Finish the game
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.add("player-winner");
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove("player-active");
};

// Start game
init();

const switchPlayer = function () {
  // Reset score
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  // console.log(activePlayer);

  // If current current player 0 change to player 1
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Disable un active players buttons
  // Enable active players buttons
  if (activePlayer === 0) {
    btnRole[0].disabled = true;
    btnHold[0].disabled = true;
    btnRole[1].disabled = false;
    btnHold[1].disabled = false;
  } else {
    btnRole[1].disabled = true;
    btnHold[1].disabled = true;
    btnRole[0].disabled = false;
    btnHold[0].disabled = false;
  }

  // change active(white overlay) to current player
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

// Rolling dice functionality
const roleDice = function () {
  if (playing) {
    // Generate random dice role
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    // Check if rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
};

const holdDice = function () {
  if (playing) {
    // Add current score to active players's score
    // scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player score is => 100
    if (scores[activePlayer] >= 1 && activePlayer == 1) {
      winner();
      // FIX. WHEN WINMNER PLAYER 2 TO INVERT
      document.querySelector(".player-winner").classList.add("invert");
    } else if (scores[activePlayer] >= 1) {
      winner();
    } else {
      // : Switch to next player
      switchPlayer();
    }
  }
};
btnRole[1].addEventListener("click", roleDice);
btnHold[1].addEventListener("click", holdDice);
btnRole[0].addEventListener("click", roleDice);
btnHold[0].addEventListener("click", holdDice);
// console.log(activePlayer);

// if (activePlayer === 0) {
//   console.log(activePlayer);
//   btnRole[1].addEventListener("click", roleDice);
//   console.log("plater 1");
// } else {
//   console.log(activePlayer);
//   btnRole[0].addEventListener("click", roleDice);
//   console.log("plater 2");
//   // player1El.disabled = true;
// }

// Reset game
// btnNew.addEventListener("click", init);

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// const openModal = function () {
//   console.log("timmy");
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };

// btnOpenModal.addEventListener("click", openModal);

// Closer Modal Button
btnCloseModal.addEventListener("click", closeModal);
// Click "overlay" to close modal
overlay.addEventListener("click", closeModal);
// Close one ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
