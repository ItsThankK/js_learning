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
const openingHours = {
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
};

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
    starterIndex = 1,
    time = `10 pm`,
    mainIndex = 0,
    address,
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Making pasta with ${ing1} ${ing2} & ${ing3}`);
  },
};


/*
const add = function (...numbers) {
  let sum = 0;
  for (let index = 0; index < numbers.length; index++) {
    sum += numbers[index];
  }
  console.log(sum);
};
add(5, 5, 5, 5);
*/
/*
const newRestaurant = {foundedIn: 1999, ...restaurant, founder: `ThankK` };
console.log(newRestaurant);

const restaurantCopy = {...newRestaurant};
*/
/*
const ingredients = [];
ingredients.push(prompt(`ing1`), prompt(`ing2`), prompt(`ing3`));
restaurant.orderPasta(...ingredients);
*/
/*
restaurant.orderDelivery({
  time: `10:30 pm`,
  address: `Enugu, Nigeria`,
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: `Bayelsa`,
});
*/

// CHALLENGE
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: { team1: 1.33, x: 3.25, team2: 6.5 },
};

const { team1: t1, team2: t2 } = game;

const [players1, players2] = game.players;
// console.log(`Player1 for team1 -> ${players1}`);
// console.log(`Player2 team2 -> ${players2}`);
// console.log(``);

const [gk, ...fieldPlayers] = players1;
// console.log(`goalKeeper for team1: ${t1} is ${gk}`);
// console.log(`   fieldPlayers for team1: ${fieldPlayers}`);
// console.log(``);

const [gk2, ...fieldPlayers2] = players2;
// console.log(`goalKeeper for team2: ${t2} is ${gk2}`);
// console.log(`   fieldPlayers for team2: ${fieldPlayers2}`);
// console.log(``);

const allPlayers = [...players1, ...players2];
// console.log(`All players on the field: ${allPlayers}`);
// console.log(``);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const { team1, x: draw, team2: team2 } = game.odds;

const printGoals = function (...numPlayers) {
  console.log(`List of all players that scored`);
  let numGoals = 0;
  for (let index = 0; index < numPlayers.length; index++) {
    console.log(`     ${numPlayers[index]} scored!`);
    numGoals++;
  }
  console.log(`Toal goals scored = ${numGoals} ⚽`);
};
// printGoals(...game.scored);
// console.log(``);

const winnerOdds = (team1 < team2 && team1) || team2;
const winnerName = (winnerOdds === team1 && t1) || t2;
// console.log(`Team ${winnerName} won with ${winnerOdds} odd `);

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const [i, el] of menu.entries()) {
  // console.log(`${i + 1}: ${el}`);
}
