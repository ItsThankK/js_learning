'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const restart = document.querySelector('.restart');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnNRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting conditions
  diceEl.classList.add('hidden');
  restart.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
}

function restartGameAnimation() {
  restart.classList.remove('hidden');
}

//Rolling dice functionality
btnNRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    let dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1
    if (dice !== 1) {
      //Keep playing & add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the other player
      switchPlayer();
    }
  } else {
    restartGameAnimation();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (scores[activePlayer] >= 100) {
      //End the game session
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  } else {
    restartGameAnimation();
  }
});

btnNew.addEventListener('click', function () {
  init();
});
