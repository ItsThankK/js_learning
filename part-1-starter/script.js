console.log("Hello world");

// let js = "amazing";
// if (js = "amazing") {
//   alert("Awesome!");
// }

let myName = "ThankGod";
let age = 19;

let jsIsFun = true;
console.log(jsIsFun);
console.log(typeof jsIsFun);

const PI = 3.14;
// PI = 22; // type error

// never use var!

const now = 2025;
const currentAge = now - 2004;
console.log(
  currentAge,
  currentAge + 5,
  currentAge - 3,
  currentAge / 50,
  currentAge * 3
);

console.log("my" + " " + "name");

let x, y;
x = y = 10;
console.log(x, y);

const idealAge = 10;
const isOldEnough = idealAge >= 18;

if (isOldEnough) {
  console.log("I can drive 😃");
} else {
  console.log("I can't drive 😢");
  const ageLeft = 18 - idealAge;
  console.log("Age left is " + ageLeft + " years");
}
