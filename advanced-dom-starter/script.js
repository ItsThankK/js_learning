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

const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

btnScrollTo.addEventListener(`click`, function (e) {
  const slcoords = section1.getBoundingClientRect();
  // console.log(slcoords);

  // console.log(e.target.getBoundingClientRect());

  // console.log(`current scroll (x/y)`, window.pageXOffset, pageYOffset);

  // console.log(
  //   `height/ width`,
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // scrolling
  // window.scrollTo(
  //   slcoords.left + window.pageXOffset,
  //   slcoords.top + window.pageYOffset
  // );

  // old method
  // window.scrollTo({
  //   left: slcoords.left + window.pageXOffset,
  //   top: slcoords.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });

  section1.scrollIntoView({ behavior: `smooth` });
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

// styles
message.style.backgroundColor = `#37383d`;
message.style.width = `120%`;

// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);

message.style.height =
Number.parseFloat(getComputedStyle(message).height, 10) + 30 + `px`;

// console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty(`--color-primary`, `orangered`);

//  attributes classes
const logo = document.querySelector(`.nav__logo`);
console.log(logo.alt);
console.log(logo.className);

console.log(logo.designer); // undefined - not a standard artribute
logo.setAttribute(`designer`, `Bankist`);
console.log(logo.getAttribute`designer`);

logo.alt = `Beautiful minimalist logo`;

console.log(logo.src);
console.log(logo.getAttribute(`src`));

const link = document.querySelector(`.nav__link--btn`);
console.log(link.href);
console.log(link.getAttribute(`href`));

// data attributes
logo.setAttribute(`data-version-number`, `3.0`);
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add(`c`);
logo.classList.remove(`c`);
logo.classList.toggle(`c`);
logo.classList.contains(`c`);

// logo.className = `jonas`; // do not use!
*/

// Events
/*
const h1 = document.querySelector(`h1`);

// old method
// h1.onmouseenter = e =>
//   alert(`addEventlistener: Great! You are reading the heading`);

// new method
// h1.addEventListener(`mouseenter`, function (e) {
//   alert(`addEventlistener: Great! You are reading the heading`);
// });

const alertH1 = function (e) {
  alert(`addEventlistener: Great! You are reading the heading`);

  h1.removeEventListener(`mouseenter`, alertH1);
};

h1.addEventListener(`mouseenter`, alertH1);

setTimeout(() => h1.removeEventListener(`mouseenter`, alertH1), 10000);
*/

// Bubbling
// event propagation: bubbling and capturing

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`link`, e.target, e.currentTarget);

  // stop propagation
  // e.stopPropagation(); 
});

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`container`, e.target, e.currentTarget);
});

document.querySelector(`.nav`).addEventListener(`click`, function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`nav`, e.target, e.currentTarget);
}, true);
