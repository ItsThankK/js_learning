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
  orderDelivery: function ({ starterIndex = 0, mainIndex = 0, time = "12", address }) {
    console.log(
      `Your order is --> Starting [${this.starterMenu[starterIndex]}] and main [${this.mainMenu[mainIndex]}] Time of delivery is [${time}], location [${address}]`
    );
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

//Destructuring objects

// The spread operator
const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
// console.log(newArr);

// console.log(...newArr);

const newMenu = [...restaurant.mainMenu, "Garri"];
console.log(newMenu);


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
