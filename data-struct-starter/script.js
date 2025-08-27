'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 0,
    mainIndex = 0,
    time = '12',
    address,
  }) {
    console.log(
      `Your order is --> Starting [${this.starterMenu[starterIndex]}] and main [${this.mainMenu[mainIndex]}] Time of delivery is [${time}], location [${address}]`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here's your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: "Giovanni Rossi",
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

rest2.numGuests ||= 0;
// console.log(rest1.numGuests);
// console.log(rest2.numGuests);

// console.log(rest2.numGuests ||= 200);

rest1.owner &&= "Anonymous 🤫";
rest2.owner &&= "Anonymous 🤫";

console.log(rest1.owner, rest2.owner);
*/


// Short circuiting - && and ||
///Logical operators can use any datatype
///return any data type
///short circuit evaluation
/*
console.log(3 || 'Jonas');
console.log(NaN || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
*/
/*
console.log('-- OR --');
// // restaurant.numGuests = 2;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 1;
// console.log(guests2);

console.log('-- AND --');
console.log(0 && 'jonas');
console.log(7 && 'jonas');

// if(restaurant.orderPizza) {
//   restaurant.orderPizza("garri", "sapa");
// }

// The logic here: If true - Do the next thing //
// && to execute code
// || to set default values
restaurant.orderPizza && restaurant.orderPizza('fish');

//Nullish operator [NOT or undefined]/
restaurant.numGuests = 0;
const guests = restaurant.numGuests ?? 10;
console.log(guests);

//Destructuring objects

//Real world example
/*
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('2'),
  prompt('3'),
];
restaurant.orderPasta(...ingredients);
*/

/*
//Objects as iterables in es 2018
const newRestaurant = { foundingYear: '2010', ...restaurant, founder: 'Jonas' };
console.log(newRestaurant.foundingYear);

// REST pattern & parameter
////Spread because it's on the right side
const arr = [1, 2, ...[3, 4, 5, 6, 7, 8, 9]];
console.log(arr);
//Rest because it's on the left side
const [a, b, ...others] = arr;
console.log(others);
//On both sides in arrays
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(otherFood);
//On both sides in objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays.fri.open);
*/
/*
//Destructuring in functions
const add = function (...numbers) {
  let result = 0;
  for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index];
    result += element;
  }
  console.log(result);
};
add(2,3,5);

restaurant.orderPizza("cheese", 4, 6, 7);
*/

/*
// The spread operator
const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
// console.log(newArr);

// console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Garri'];
console.log(newMenu);

//Copy array
const mainMenuCopy = [...restaurant.mainMenu];

//Join 2 or more arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//Iterables
const str = 'Jonas';
const letters = [...str, '', 'S.'];
console.log(letters);
*/

/*
restaurant.orderDelivery({
  address: 'Enugu',
  mainIndex: 2,
  time: '10:30',
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "Bayelsa",
})
*/

/*
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);
*/

/*
//Mutating while destructuring
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
// console.log(a, b);

//Nested objects
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

const {
  fri: { open: openHour, close },
} = hours;
// console.log(openHour);

//

//Destructuring
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// [secondary, main] = [main, secondary]
// console.log(main, secondary);

const [starterCourse, mainCourse] = restaurant.order(2, 0);
// console.log(starterCourse, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

// const [i, j, [k1, k2]] = nested;
// console.log(i, j, k2);

//Default values
const [i = 1, j = 1, k = 1] = [8, 9];
// console.log(i, j, k);
*/
