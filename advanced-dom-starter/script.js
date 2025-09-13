'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////
// selecting elements
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector(`header`);
const allSection = document.querySelectorAll(`.section`);
console.log(allSection);

document.getElementById(`section--1`);
const allButtons = document.getElementsByTagName(`button`);
console.log(allButtons);

console.log(document.getElementsByClassName(`btn`));
*/

// creating and inserting elements

// .insertAdjacentHTML
const message = document.createElement(`div`);
message.classList.add(`cookie-message`);
// message.textContent = `We use cookie for improved functionality and analytics.`;
message.innerHTML = `We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

const header = document.querySelector(`header`);
// header.prepend(message); // before as a child
// header.append(message); // after as a child
// header.append(message.cloneNode(true)) // have it at different places

// header.before(message); //truely before the header
header.after(message);

// deleting elements
document
  .querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, function () {
    // message.remove() //new method
    message.parentElement.removeChild(message); // old method
  });
