"use strict";

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
