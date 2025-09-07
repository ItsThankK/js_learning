'use strict';

/*
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES6 Way price = 199

  // ES5 Way
  // numPassengers ||= 1;
  // price ||= 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking(`LH123`);
createBooking(`LH123`, 2, 800);
createBooking(`LH123`, 2,);
createBooking(`LH123`, undefined ,2);
*/
/*
const flight = `LH234`;
const jonas = {
  name: `Jonas Schmedtmann`,
  passport: 48949403994,
};

const checkIn = function (flightNum, passenger) {
  flightNum = `LH999`;
  passenger.name = `Mr. ` + passenger.name;

  if (passenger.passport === 48949403994) {
    alert(`Check in`);
  } else {
    alert(`Wrong passport!`);
  }
};
// checkIn(flight, jonas);
console.log(flight, jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

// newPassport(jonas);
// checkIn(flight, jonas);
*/

// Passing by reference OR values?
// Javascript DOESN'T have passing by reference/
// Javascript pass a value
/*
const oneWord = function (str) {
  return str.replace(/ /g, ``).toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(` `);
  return [first.toUpperCase(), ...others].join(` `);
};

// Higher order function/
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string; ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer(`JavaScript is the best!`, upperFirstWord);
console.log(` `);
transformer(`JavaScript is the best!`, oneWord);

// JavaScript callbacks!/
const high5 = function () {
  console.log(`👋`);
};
document.body.addEventListener(`click`, high5);

[`Jonas`, `Martha`, `Adam`].forEach(high5);

// Fuctions returning functions/
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet(`Hey`);
greeterHey(`ThankK`);
greeterHey(`Jonas`);
greet(`Hello`)(`World`);

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
*/
// Call and Apply methods
/*
const lufthansa = {
  airline: `Lufthansa`,
  iataCode: `LH`,
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
const book = lufthansa.book;
// lufthansa.book(239, `Jonas SchM`);
// lufthansa.book(635, `John Smith`);
console.log(lufthansa);

const eurowings = {
  airline: `Eurowings`,
  iataCode: `EW`,
  bookings: [],
};
const swiss = {
  airline: `Swiss`,
  iataCode: `SW`,
  bookings: [],
};
// Copy luth book method into book [a normal fuction]
// Call Method/
// This is now the eurowings
book.call(eurowings, 23, `Sarah Williams`);
// This is now lufthansa
book.call(lufthansa, 258, `jj onas`);
// This is now swiss
book.call(swiss, 7458, `swiss jet`);
console.log(eurowings);
console.log(lufthansa);
console.log(swiss);

// Apply method! Doesn't recieve inputs/
// Takes an array of the elements
// Not used much in modern JS
const flightData = [888, `George Cooper`];
book.apply(swiss, flightData);
console.log(swiss);
// More modern and used 👇
book.call(swiss, ...flightData);

// THE BIND METHOD
// More important than the call and apply
// Returns a function where the THIS is bound
console.log(`BIND... `.repeat(5));
const bookEw = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLx = book.bind(swiss);

bookEw(77777, `John Wick`);
// Partial application
const bookEW23 = book.bind(eurowings, 23);
bookEW23(`Tinubu`);

// With event listeners
lufthansa.planes = 300;
lufthansa.buyplane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
document
  .querySelector(`.buy`)
  .addEventListener(`click`, lufthansa.buyplane.bind(lufthansa));

// Still on partial application
const addTask = (rate, value) => value + value * rate;
console.log(addTask(0.1, 200));
// Null because we are not using the THIS here!
const addVAT = addTask.bind(null, 0.23);
console.log(addVAT(100));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.5);
console.log(addVAT2(100));
*/

console.log(`CHALLENGE 1...`.repeat(3));
// CHALLENGE 1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:  C++'], // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const userInputNum = Number(
      prompt(
        `What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number) `
      )
    );
    console.log(`User Input: ${userInputNum}`);
    console.log(`Current poll array: ${this.answers}`);
    if (userInputNum < 0 || userInputNum > 3) {
      alert(`NOT A CORRECT NUMBER!!!`);
      this.registerNewAnswer();
    } else {
      this.answers[`${userInputNum}`] += 1;
      this.displayResults(String(this.answers));
      this.displayResults(this.answers);
    }
  },
  displayResults(type) {
    if (typeof type === `string`) {
      console.log(`AS STRING`);
      console.log(`Poll results are ${this.answers}`);
    } else {
      console.log(`AS ARRAY`);
      console.log(`Updated pool array: [${this.answers}]`);
    }
  },
};

const answerPoll = poll.registerNewAnswer;
const answerPollBtn = document
  .querySelector('.poll')
  .addEventListener(`click`, function () {
    answerPoll.call(poll);
  });

/*
Test data for bonus:
Data 1: [5, 2, 3]
Data 2: [1, 5, 3, 9, 6, 1] 
*/

// IIFE
// A function that runs only once and disappears
(function () {
  console.log(`This will never run again!`);
  const isPrivate = 23;
})();

(() => console.log(`This will also never run again`))();
// Won't work because of scoping
// console.log(isPrivate);

// Closures
const secureBooking = function () {
  
}