'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector(`.nav`);

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

// ///////////////////////
// page navigation
// not a clean solution
// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     console.log(`link`);
//     const id = this.getAttribute(`href`);
//     console.log(id);

//     document.querySelector(`${id}`).scrollIntoView({ behavior: `smooth` });
//   });
// });

// event delegation - using the event on the parent
// 1. add event listener to common parent element
// 2. determine what element originated the event
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(`${id}`).scrollIntoView({ behavior: `smooth` });
  }
});

//Tabbed component
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);

  // guard clause
  if (clicked === null) return;

  // active tab
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));
  clicked.classList.add(`operations__tab--active`);

  // activate content area
  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// menu fade animation

// refactoring
const handleHover = function (e) {
  // console.log(e); mouse event
  // console.log(this); opacity

  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = `${this}`;
    });
    logo.style.opacity = `${this}`;
  }
};
// because of bind - e is the event passed
// this is the opacity
// only 1 argument is allowed
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
// opposite of mouseover
nav.addEventListener(`mouseout`, handleHover.bind(1));

// sticky navigation - the scroll event
// const initialCoords = section1.getBoundingClientRect();
// console.log(window.screenY);
// console.log(initialCoords.top);

// window.addEventListener(`scroll`, function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add(`sticky`);
//   else nav.classList.remove(`sticky`);
// });

// Sticky navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(`header`);

const observerHeading = new IntersectionObserver(
  function (entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) nav.classList.add(`sticky`);
      else nav.classList.remove(`sticky`);
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
  }
);
observerHeading.observe(header);
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
/*
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
      
      document.querySelector(`.nav`).addEventListener(
        `click`,
        function (e) {
          this.style.backgroundColor = randomColor();
          console.log(`nav`, e.target, e.currentTarget);
          },
          true
          );
          */

/*
// dom trasversing - walking through the dom
const h1 = document.querySelector(`h1`);

// going downwards: child
console.log(h1.querySelectorAll(`.highlight`));
console.log(h1.childNodes); // not used - nodeList
console.log(h1.children); // only for direct children - html collection
h1.firstElementChild.style.color = `white`;
h1.lastElementChild.style.color = `orangered`;

// going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(`.header`).style.background = `var(--gradient-secondary)`; // finds parents

h1.closest(`h1`).style.background = `var(--gradient-primary)`; // finds parents

// going sideways: siblings
// we can only access direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.transform = `scale(0.5)`;
  }
});
*/
