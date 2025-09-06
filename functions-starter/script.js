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
