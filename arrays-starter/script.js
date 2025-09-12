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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ``; // set to empty
  const movs = sort ? movements.slice(0).sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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
// displayMovements(account1.movements);

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
createUsernames(accounts);
/*
console.log(account1.username);
console.log(account2.username);
console.log(account3.username);
console.log(account4.username);
*/
// Calc the movements, display sum in the UI/
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, mov) => accum + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  // console.log(acc);
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

const updateUi = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Summary
  calcDisplaySummary(acc);
  // Balance
  calcDisplayBalance(acc);
};

// Event handlers
let currentAccount;

btnLogin.addEventListener(`click`, function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(` `)[0]
    }`;
    labelWelcome.style.color = `#9be15d`;
    containerApp.style.opacity = `1`;

    updateUi(currentAccount);
    // Clear the input fields
    inputLoginPin.value = inputLoginUsername.value = ``;
    // remove the cursor focus
    inputLoginPin.blur();
    console.log(`LOGIN successful 🙂`);
    console.log(` `);
  } else {
    console.log(
      `Can't login --- wrong username, pin or account no longer exists! 👮🛑`
    );
    console.log(` `);
  }
});

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ``;
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    currentAccount.username !== recieverAcc?.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    console.log(`Transfer of ${amount} successful 👍`);
    console.log(` `);

    updateUi(currentAccount);
  } else {
    console.log(`Transfer invalid 😫❌`);
    console.log(` `);
  }
});

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // Add movement
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
    console.log(`Loan granted 🎉 and credited 💰`);
    console.log(` `);
  }
  inputLoanAmount.value = ``;
});

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    console.log(`Deleted ${currentAccount.owner.toUpperCase()}'s account! 💔`);
    console.log(` `);
    // Hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log(`Wrong username or pin! ✖`);
    console.log(` `);
  }
  inputCloseUsername.value = inputClosePin.value = ``;
});

let sorted = false;
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
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
/*
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
*/

// CHALLENGE 4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

console.log(`Number 1`);
dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));
console.log(dogs);
console.log(``);

console.log(`Number 2`);
const findSarahsDog = dogs
  .filter(dog => dog.owners.includes(`Sarah`))
  .map(dog =>
    dog.curFood > dog.recommendedFood
      ? `Dog is eaing too much`
      : `Dog is eaing too little`
  )
  .join();
console.log(findSarahsDog);
console.log(``);

console.log(`Number 3`);
const ownersEatTooMuch = [];
const ownersEatTooLittle = [];
dogs.map(dog =>
  dog.curFood > dog.recommendedFood
    ? ownersEatTooMuch.push(...dog.owners)
    : ownersEatTooLittle.push(...dog.owners)
);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
console.log();

console.log(`Number 4`);
console.log(`${ownersEatTooMuch.join(` and `)} dogs eat too much`);
console.log(`${ownersEatTooLittle.join(` and `)} dogs eat too little`);
console.log(``);

console.log(`Number 5`);
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
console.log(``);

console.log(`Number 6`);
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);
console.log();

console.log(`Number 7`);
console.log(
  dogs.filter(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);
console.log(``);

console.log(`Number 8`);
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));

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
/*
// find
// returns a new array containing only the first element that satisfies the condition
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === `Jessica Davis`);
console.log(account);
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
/*
// Checks equality
console.log(movements.includes(-130));

// some methods - check condition
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// every method
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// flat method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

console.log(
  accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((accum, el) => accum + el, 0)
);
// flatMap method
console.log(
  accounts.flatMap(acc => acc.movements).reduce((accum, el) => accum + el, 0)
);
// Sorting arrays
// Stringd
const owners = [`Jonas`, `Zach`, `Adam`, `Martha`];
console.log(owners.sort()); // mutates owners array
// Numbers
console.log(movements);
// console.log(movements.sort()); // converts num to string b4 sorting 1,2,3

// From Jonas
// return < 0 : a b4 b
// return > 0 : b b4 a
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
})

// From bro code Yt [Simpler]
// Imagine a, b is 1, 2
// 1 - 2 = -1 : so its sorted in ascending order (- to +)
// 2 - 1 = 1 : so its sorted in descending order (+ to -)
// movements.sort((a, b) => a - b);
console.log(movements);
*/
/*
// Creating/ generating new arrays programmatically
const x = new Array(7);
console.log(x);
x.fill(1, 3, 4);
console.log(x);

// from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
// from on iterables/ arrayLike object
labelBalance.addEventListener(`click`, function () {
  const movementsUI = Array.from(
    document.querySelectorAll(`.movements__value`),
    el => Number(el.textContent.replace(`€`, ``))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll(`.movements__value`)];
  console.log(movementsUI2);
});
*/
