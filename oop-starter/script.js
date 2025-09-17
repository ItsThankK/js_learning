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

// CHALLENGE 1
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log((this.speed += 10));
};

Car.prototype.brake = function () {
  console.log((this.speed -= 5));
};

const car1 = new Car(`BMW`, 120);
const car2 = new Car(`Mercedes`, 95);

console.log(car1);
car1.accelerate();
car1.brake();
car1.accelerate();
car1.brake();
car1.accelerate();
car1.brake();
console.log(``);
console.log(car2);
car2.accelerate();
car2.brake();
car2.accelerate();
car2.brake();
car2.accelerate();
car2.brake();
*/

// ES6 classes
// class espression
// const PersonCl1 = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods - Methods that will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return this.calcAge();
  }

  set fullName(name) {
    if (name.includes(` `)) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
  // static method - Instances can't use them
  static hey() {

  }
}

const jessica = new PersonCl(`Jessica Davis`, 1996);
console.log(jessica);
jessica.calcAge();

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`);
};
jessica.greet();
jessica.age;
jessica.fullName = `jes dav`;
console.log(jessica._fullName);
console.log(jessica.fullName);

// static methods
// methods that are tied to the constructor
PersonCl.hey = function () {
  console.log(`Hey there 👋`);
  console.log(this);
  
};
PersonCl.hey();
// jessica.hey(); // cant call it

/**
 * 1. classes are not hoisted
 * 2. classes are first class citizens
 * 3. classes are executed in strict mode
 */

// setter and getters
// fuctions that get a value
/*
const account = {
  owner: `jonas`,
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements[this.movements.length - 1];
  },

  set latest(mov) {
    this.movements[this.movements.length - 1] = mov;
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.latest);
*/
