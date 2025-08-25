"use strict";
/*
function logger() {
  console.log("I am a logger function");
}

logger();

// declaration
function calAge(birthYear) {
  return 2025 - birthYear;
}
console.log(calAge(15));

// expression
const calAge2 = function (birthYear) {
  return 3000 - birthYear;
};
console.log(calAge2(299));

// arrow functions
const calAge3 = (birthYear) => 2027 - birthYear;
const calAge4 = (birthYear, birthYear2) => {
  console.log(birthYear, birthYear2);
};

// functions calling other functions
function callMe(myName) {
  return `My name is ${myName}`;
}

function letMyName(myName) {
  let result = callMe(myName);
  console.log(result);
}

letMyName("Elon Musk");

// Arrays
const friends = ["Micheal", "Steven", "Peter"];

const firstFriend = friends[2];
console.log(firstFriend);

const years = new Array(1990, 2020, "Lean");
console.log(years[2]);

// Objects
const jonas = {
  firstName: "jonas",
  lastName: "jonas-2",
  age: 22,
  job: "tutor",
  friends: ["f1", "f2", "f2"],
};

console.log(jonas.friends[2]);
*/

// const interstedIn = prompt("What do you want to know about jonas?");
// console.log(jonas[interstedIn]);

// Object methods
const jonas2 = {
  firstName: "jonas2",
  lastName: "jonas2.2",
  birthYear: 2000,
  job: "frontend dev",
  friends: ["auditor", "web3", "backend"],
  hasId: true,
  calAge: function (birthYear) {
    return 2025 - birthYear;
  },
};

console.log(jonas2.calAge(jonas2.birthYear));

// Loop iteration
const array = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
for (let rep = 0; rep < array.length; rep++) {
  const element = array[rep];
  console.log(element);
}

// continue and break statements
// It continue (skips) if the condition is met
// It breaks (terminates) the whole iteration loop
