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
/*
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
/*
// CHALLENGE 2
console.log(`LOOPING OVER GOALS SCORED ARRAY IN THE GAME OBJECT`);
for (const [goalIndex, playerName] of game.scored.entries()) {
  console.log(`Goal ${goalIndex + 1}: ${playerName}`);
}
console.log(``);
console.log(`LOOPING OVER ODDS ARRAY AND CALCULATING THE AVERAGE ODD`);
const oddsArr = Object.values(game.odds);
let oddsSum = 0;
for (const oddsNum of oddsArr) {
  oddsSum += oddsNum;
}
console.log(`Average of the odds: ${oddsSum / oddsArr.length}`);
console.log(``);
console.log(`LOOPING THE GAME OBJECT AND FETTCHING THE TEAM NAME AND ODD`);

for (const [key, value] of Object.entries(game.odds)) {
  console.log(`Odd of victory ${game[key] ?? `draw`}: ${value}`);
}
*/

/**Start learning SETS */
/*
const ordersSet = new Set([
  `Pasta`,
  `Pizza`,
  `Pizza`,
  `Risotto`,
  `Pasta`,
  `Pizza`,
]);

console.log(ordersSet);
console.log(ordersSet.size);
console.log(ordersSet.has(`Pizza`));
console.log(ordersSet.has(`Bread`));
ordersSet.add(`Garlic Bread`);
ordersSet.add(`Garlic Bread`);
ordersSet.delete(`Risotto`);
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) {
  console.log(order);
}

// Example
const staff = [`Waiter`, `Chef`, `Waiter`, `Manager`, `Chef`, `Waiter`];

const staffUnique = [...new Set(staff)];
console.log(staffUnique);

*/
/**Start learning MAPS */
/*
const rest = new Map();
rest.set(`name`, `Classico Italiano`);
rest.set(1, `Firenze, Italy`);
console.log(rest.set(2, `Lisbon, Portugal`));

rest
  .set(`categories`, [`Waiter`, `Chef`, `Waiter`, `Manager`])
  .set(`open`, 11)
  .set(`close`, 23)
  .set(true, `We are open`)
  .set(false, `We are closed`);

// console.log(rest.get(`name`));
// console.log(rest.get(true));

const time = 21;
console.log(rest.get(time > rest.get(`open`) && time < rest.get(`close`)));
console.log(rest.has(`categories`));
rest.delete(2);
console.log(rest.size);
// rest.clear()
const arrT = [1, 2];
rest.set(document.querySelector(`h1`), `Heading`);
rest.set(arrT, `Test`);

console.log(rest.get(arrT));
*/
/**Start learning MAP Iteration */
/*
const question = new Map([
  [`question`, `What is the best programming language in the world?`],
  [1, `C`],
  [2, `Java`],
  [3, `JavaScript`],
  [`correct`, 3],
  [true, `You answered correctly! 😀`],
  [false, `You answered incorrectly! 😫`],
]);
// console.log(question);

// Convert object to map
const hoursMap = new Map(Object.entries(hours));
// console.log(hoursMap);

// Quiz app

console.log(question.get(`question`));
for (const [key, value] of question) {
  if (typeof key === `number`) {
    console.log(`Answer ${key}: ${value}`);
  }
}
const answer = Number(prompt(`Your answer`));
console.log(answer);

console.log(question.get(question.get(`correct`) === answer));

// Convert map to array
console.log([...question]);
*/

//CHALLENGE 3
/*
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

console.log(`SIZE OF THE GAMES EVENT`);
console.log(gameEvents.size);

console.log(`CONVERT MAP TO ARRAY`);
const events = [...new Set(gameEvents)];
console.log(events);

console.log(`SIZE OF THE GAMES EVENT AFTER DELETING`);
gameEvents.delete(64);
console.log(gameEvents.size);

console.log(`HOW FREQUENTLY EVENTS HAPPENED IN THE 90 MIN FOOTBALL GAME`);
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

console.log(``);
console.log(`MARKING EVENTS INTO FIRST HALF OR SECOND HALF`);
for (const [time, event] of gameEvents) {
  time <= 45
    ? console.log(`[FIRST HALF] ${time}: ${event}`)
    : console.log(`[SECOND HALF] ${time}: ${event}`);
}
*/

// START WORKING WITH STRINGS SECTION
const airline = `TAP Air Portugal`;
const plane = `A320`;
/*
console.log(plane[0]);
console.log(`b747`[2]);
console.log(airline.length);
console.log(airline.indexOf(`r`));
console.log(airline.lastIndexOf(`r`));
console.log(airline.indexOf(`portugal`));
// 0 indexed, starts at index 4, stops and excludes index 7
console.log(airline.slice(4, 7));
// Extracting words from strings
console.log(airline.slice(0, airline.indexOf(` `)));
console.log(airline.slice(airline.lastIndexOf(` `) + 1));
console.log(airline.slice(-5));
console.log(airline.slice(1, -5));
*/
/*
const checkMiddleSeat = function (seat) {
  // B and E are the middle seats
  const test = seat.slice(-1) === `B` || seat.slice(-1) === `E`;
  console.log(test ? `You got the middle seat!` : `You got lucky!`);
};
checkMiddleSeat(`11B`);
checkMiddleSeat(`23C`);
checkMiddleSeat(`3E`);

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
const passanger = `jOnaS`;
const passangerLower = passanger.toLowerCase();
const passangerCorrect =
  passangerLower[0].toUpperCase() + passangerLower.slice(1);
console.log(passangerCorrect);

// Comparing email
const email = `hello@jonas.io`;
const loginEmail = `   Hello@Jonas.Io \n`;

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
// better and shorter
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(normalizedEmail === email);
// Replacing parts of strings
const priceGB = `288,97#`;
const priceUS = priceGB.replace(`#`, `$`).replace(`,`, `.`);
console.log(priceUS);
const announcement = `All passengers come to boarding door 23. Boarding door 23`;
console.log(announcement.replaceAll(`door`, `gate`));
// String methods that return boolean
const planeN = `A320neo`;
console.log(planeN.includes(`a`));
console.log(planeN.startsWith(`A`));
console.log(planeN.endsWith(`A`));

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes(`knife`) || baggage.includes(`gun`)) {
    console.log(`You are NOT allowed onboard`);
  } else {
    console.log(`You are allowed aboard`);
  }
};

checkBaggage(`I have a laptop, some Food and a pocket Knife `);
checkBaggage(`Socks and camera`);
checkBaggage(`Got some snacks and a gun for protection`);

// START LEARNING SPLIT/
console.log(...`a+very+nice+string`.split(`+`));
// Destructuring string arrays to variables
const [firstName, lastName] = `Jonas Schedtmann`.split(` `);
console.log(firstName, lastName);
const newName = [`Mr.`, firstName, lastName.toUpperCase()].join(` `);
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(` `);
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(` `));
};
const passangerN = `jessica ann smith davis`;
capitalizeName(passangerN);
capitalizeName(newName);

// Padding a string
// padStart/
const message = `Go to gate 23!`;
console.log(message.padStart(25, `+`));
console.log(`jonas`.padStart(25, `+`));
// padEnd/
// adds 10 - and make it 35
console.log(message.padStart(25, `+`).padEnd(35, `-`));
console.log(`jonas`.padStart(25, `+`).padEnd(35, `-`));
// Real world example of padding/
const maskCreditCard = function (number) {
  const str = number + ``;
  // str.slice(-4);
  console.log(str.slice(-4).padStart(str.length, `*`));
};
maskCreditCard(43378463864647384);
maskCreditCard(`849493993838389984848774`);

// Repeat/
const message2 = `Bad weather... All Departures Delayed... `;
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${`✈`.repeat(n)}`);
};
planesInLine(5);
*/

// CHALLENGE 4 //
// Add textarea & button to html
document.body.append(document.createElement(`textarea`));
document.body.append(document.createElement(`button`));
// Select the elements in JavaScript
const textarea = document.querySelector(`textarea`);
const button = document.querySelector(`button`);
// Onclick action of the button
button.addEventListener(`click`, function () {
  const words = textarea.value;
  console.log(words);

  const wordsArray = words.split(` `);
  const wordsArrayToSet = new Set(wordsArray);
  console.log(wordsArrayToSet.delete(``));
  const wordsArrayToSetBackToArray = [...wordsArrayToSet];
  console.log(wordsArrayToSetBackToArray);

  let counter = 1;
  for (const word of wordsArrayToSetBackToArray) {
    const [fW, sW] = word.toLowerCase().trim().split(`_`);
    const replaced = sW.replace(sW[0], sW[0].toUpperCase());
    const finalWord = fW + replaced;
    console.log(finalWord.padEnd(20, ` `) + `✅`.repeat(counter));
    counter++;
  }
});

// TEST DATAS
// a_b c_d e_r            v_z
// underscore_case   first_name   Some_Variable      calculate_AGE delayed_departure

for (const flight of flights.split(`+`)) {
  const [type, from, to, time] = flight.split(`;`);
  const output = `${type.includes(`Delayed`) ? `❌` : `✅`} ${type.replaceAll(
    `_`,
    ` `
  )} ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(`:`, `h`)})`.padStart(27);
  console.log(output);
}
