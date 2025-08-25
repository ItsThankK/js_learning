'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnNRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let currentScore = 0;

//Rolling dice functionality
btnNRoll.addEventListener("click", function() {
  diceEl.classList.remove("hidden");
  let dice = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;

  // Check for rolled 1
  if(dice !== 1) {
    //Keep playing & add dice to current score
    currentScore += dice;
    current0El.textContent = currentScore; //change later
  } else {
    //Switch to the other player
    
  }
});
