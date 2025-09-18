'use strict';

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

const h1 = document.querySelector(`h1`);
console.dir(h1);
console.dir(x => x + 1);

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
  static hey() {}
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

// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = `Steven`;
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init(`Sarah`, 1979); // programmatically setting the properties
sarah.calcAge();

// inheritance between classes: constructur functions
const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person2.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // DRY
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // using call to set the this keyword
  Person2.call(this, firstName, birthYear);
  this.course = course;
};
// linking prototypes
Student.prototype = Object.create(Person2.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student(`Mike`, 2020, `Computer Science`);
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person2);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

// inheritance between classes: ES6 classes
// we need the extend keyword and super function
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // needs to happen first - creates the this
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(`I am ${2037 - this.birthYear} years old`);
  }
}

// still works
// const martha = new StudentCl(`Martha Jones`, 2012);
const martha = new StudentCl(`Martha Jones`, 2012, `Computer Engineering`);
martha.introduce();
martha.calcAge();

// inheritance between classes: Object.create
const PersonProto2 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const stevenO = Object.create(Person2);

const StudentProto = Object.create(PersonProto2);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};
const jay = Object.create(StudentProto);
jay.init(`Jay`, 2010, `Computer Sc`);

jay.calcAge();

// more class examples
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property convention
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening and account ${owner}`);
  }
  // Public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this._movements.push(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account(`Jonas`, `EUR`, 1111, []);
console.log(acc1);
// Dangerous way
// acc1.movements.push(250);
// acc1.movements.push(-140);

// better and safer way - create & call methods
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
// console.log(acc1.movements.reduce((a, e) => (a += e))); // works
acc1.requestLoan(100);

// encapsulation: protected properties and methods

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

// CHALLENGE 2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log((this.speed += 10));
  }

  brake() {
    console.log((this.speed -= 5));
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(newSpeed) {
    this.speed = newSpeed * 1.6;
  }
}
const ford = new CarCl(`Ford`, 120);

console.log(`car: `, ford);
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.brake();
ford.brake();
ford.brake();
ford.brake();
console.log(`car: `, ford);
console.log(ford.speedUS);
console.log((ford.speedUS = 120));
console.log(``);

// CHALLENGE 3
console.log(`CHALLENGE 3... `.repeat(3));
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};
const tesla = new EV(`Tesla`, 120, 23);
tesla.accelerate(); tesla.brake();
tesla.chargeBattery(90); console.log(tesla.charge);

console.log(tesla instanceof EV);
console.log(tesla instanceof Car);
console.log(tesla instanceof Object);
*/
