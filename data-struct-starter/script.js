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
const weekDays = [`mon`, `tue`, `wed`, `thur`, `fri`, `sat`, `sun`];
const hours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
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
  // openingHours: openingHours,
  hours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, time = `10 pm`, mainIndex = 0, address }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Making pasta with ${ing1} ${ing2} & ${ing3}`);
  },
};
// console.log(restaurant.openingHours?.mon?.open);
//  RW Example
const days = [`mon`, `tue`, `wed`, `thur`, `fri`, `sat`, `sun`];

for (const day of days) {
  const open = restaurant.hours[day]?.open ?? `No`;
  // console.log(`Do we open on ${day}? ${open}`);
}

// METHODS:
// console.log(restaurant.order?.(0, 1) ?? `Method does not exist`);

// ARRAYS
const users = [
  {
    name: `jonas`,
    email: `hello@j.com`,
  },
];

// console.log(users[0]?.name ?? `User doesn't exist`);

// Objects keys - value looping
// properties NAMES
const properties = Object.keys(hours);
let openStr = `We are open ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day} `;
}
// console.log(openStr);

// properties VALUES
const values = Object.values(hours);
// console.log(values);

// properties ENTRIES
const entries = Object.entries(hours);
// console.log(entries);

for (const [day, { open, close }] of entries) {
  // console.log(`On ${day}, we open at ${open} and close at ${close}`);
}

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

// CHALLENGE 2
console.log(`LOOPING OVER GOALS SCORED ARRAY IN THE GAME OBJECT`);
for (const [goalIndex, playerName] of game.scored.entries()) {
  console.log(`Goal ${goalIndex + 1}: ${playerName}`);
}console.log(``);
console.log(`LOOPING OVER ODDS ARRAY AND CALCULATING THE AVERAGE ODD`);
const oddsArr = Object.values(game.odds);
let oddsSum = 0;
for (const oddsNum of oddsArr) {
  oddsSum += oddsNum;
}
console.log(`Average of the odds: ${oddsSum / oddsArr.length}`); console.log(``);
console.log(`LOOPING THE GAME OBJECT AND FETTCHING THE TEAM NAME AND ODD`);

for (const [key, value] of Object.entries(game.odds)) {
  console.log(`Odd of victory ${game[key] ?? `draw`}: ${value}`);
}
