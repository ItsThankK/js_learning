'use strict';
/*
// constructor fuctions & the new operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Bad practice! Never create a method inside of a constructor
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // }
};
// 4 steps to create this //
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to a prototype
// 4. fuction automatically returns the {}
const jonas = new Person(`Jonas`, 1991);
console.log(jonas);

const maltilda = new Person(`Maltilda`, 2017);
const jack = new Person(`Jack`, 1975);
console.log(maltilda, jack);

const j = 1;
console.log(jonas instanceof Person); //true
console.log(j instanceof Person); //false

// prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); //true
console.log(Person.prototype.isPrototypeOf(jonas)); //true

Person.prototype.species = `Homo Sapiens`;
console.log(jonas);
console.log(jonas.__proto__);
console.log(jonas.hasOwnProperty(`firstName`)); //true
console.log(jonas.hasOwnProperty(`species`)); // false

// theory
// prototypal inheritance and the prototype chain
// prototypal inheritance on built in objects

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); // not a good idea

const h1 = document.querySelector(`h1`)
console.dir(h1);
console.dir(x => x + 1);
*/
