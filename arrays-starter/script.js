'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Display movements!/
const displayMovements = function (movements) {
  containerMovements.innerHTML = ``; // set to empty
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } tx - ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};
displayMovements(account1.movements);

// Computing usernames!/
// const user = `Steven Thomas Williams`; // stw
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(` `)
      .map(name => name.slice(0, 1))
      .join(``);
  });
};
/*
createUsernames(accounts);
console.log(account1.username);
console.log(account2.username);
console.log(account3.username);
console.log(account4.username);
*/
// Calc the movements, display sum in the UI/
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((accum, mov) => accum + mov, 0);
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = [`a`, `b`, `c`, `d`, `e`];
// slice method - Doesn't mutate the array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
// Using slice to create a shallow copy
console.log(arr.slice());

// splice method - mutates the array
// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr.splice(1, 2));
console.log(arr); // array mutated!

// reverse method - mutates the array
arr = [`a`, `b`, `c`, `d`, `e`];
const arr2 = [`j`, `i`, `h`, `g`, `f`];
console.log(arr2.reverse());
console.log(arr2); // array mutated!

// concat method - Doesn't mutate the array
const letters = arr.concat(arr);
console.log(letters);

// join method - converts to string
console.log(letters.join(` -`));
// AT method
let arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1));
console.log(arr.at(-1));
*/
// FOREACH Looping arrays
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: Deposit of ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: Withdrawal of ${Math.abs(movement)}`);
  }
}
console.log(`---forEach---  `.repeat(3));
// (element, index, array)
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`You deposited ${mov}`);
  } else {
    console.log(`You withdrew ${Math.abs(mov)}`);
  }
});
console.log(``);
// forEach with maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// forEach with sets
const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value) {
  console.log(`${value}`);
});
*/

// CHALLENGE 1

// Test data 1
// const JuliasData = [3, 5, 2, 12, 7];
// const KatesData = [4, 1, 15, 8, 3];
// Test data 2
// const JuliasData = [9, 16, 6, 8, 3];
// const KatesData = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice();

  dogsJuliaCopy.splice(0, 1);
  dogsJuliaCopy.splice(-2);

  const combinedDogArray = dogsJuliaCopy.concat(dogsKate);

  combinedDogArray.forEach(function (dogsAge, dogNum, _) {
    const dataResult =
      dogsAge >= 3
        ? `Dog number ${dogNum + 1} is an adult, and is ${dogsAge} years old`
        : `Dog number ${dogNum + 1} is still a puppy 🐶`;
    console.log(dataResult);
  });
};
// checkDogs(JuliasData, KatesData);

// CHALLENGE 2
const calcAverageHumanAge = function (dogsAges) {
  console.log(`Input array:`, dogsAges);

  const dogAgeInHuman = dogsAges
    .map(dogAge => {
      return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
    })
    .filter(dogHumanAge => {
      return dogHumanAge >= 18;
    });
  console.log(`Filterred array:`, dogAgeInHuman);

  const averageDogHumanAge =
    dogAgeInHuman.reduce((accum, dog) => {
      return accum + dog;
    }, 0) / dogAgeInHuman.length;
  console.log(`Average age:`, averageDogHumanAge, `years`);
};
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log(``);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// CHALLENGE 3
const calcAverageHumanAge2 = dogsAges =>
  dogsAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(dogHumanAge => dogHumanAge >= 18)
    .reduce((accum, dog, _, arr) => accum + dog / arr.length, 0);

console.log(
  `Average age:`,
  calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]),
  `years`
);
console.log(
  `Average age:`,
  calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]),
  `years`
);
/*
// MAP method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementsUsd = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUsd);

const movementsDescriptions = movements.map(
  (mov, i, _) =>
    `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${mov}`
);
console.log(movementsDescriptions);

// FILTER method
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);
const withdrawals = movements.filter(mov => mov < 0);
console.log(movements);
console.log(withdrawals);

// REDUCE method
// Instead of e, i, a - accumulator, e, i, a
const balance = movements.reduce((accum, currentEl, i, arr) => {
  console.log(`Iteration: ${i}: Accumulator ${accum}`);
  return accum + currentEl;
}, 0); //Initial value of accum = 0
console.log(balance);

const max = movements.reduce((accum, mov) => {
  return accum < mov ? mov : accum;
}, movements[0]);
console.log(max);
*/
/*
const eurToUsd = 1.1;
// PIPELINE or CHAINING
const totalDepositsUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((accum, mov) => accum + mov, 0);
*/
