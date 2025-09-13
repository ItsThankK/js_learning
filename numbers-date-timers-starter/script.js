'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMomentDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, `0`);
  const month = `${date.getMonth() + 1}`.padStart(2, `0`); // 0 based or indexed
  const year = `${date.getFullYear()}`;
  return `${day}/${month}/${year}`;
};

const formaatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: `currency`,
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMomentDate(date, acc.locale);

    const formattedMovement = formaatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formaatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formaatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formaatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formaatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

let timer;
const startLogOutTimer = function () {
  const tick = function () {
    const min = `${Math.floor(time / 60)}`.padStart(2, `0`);
    const sec = `${time % 60}`.padStart(2, `0`);
    // print the remaining time
    labelTimer.textContent = `${min}:${sec}`;

    // when timer expires, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = `0`;
    }
    // decrease 1 sec
    time--;
  };

  // set time to 5 mins
  let time = 300;
  // call timer every sec
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// experimenting with the intl api
// const now = new Date();
// const options = {
//   hour: `numeric`,
//   minute: `numeric`,
//   day: `numeric`,
//   month: `long`,
//   year: `numeric`,
//   weekday: `long`
// }
// const locale = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);

    // Create current date and time
    const options = {
      hour: `numeric`,
      minute: `numeric`,
      day: `numeric`,
      month: `long`,
      year: `numeric`,
      weekday: `long`,
    };
    // const locale = navigator.language; // from the browser
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(new Date());
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, `0`);
    // const month = `${now.getMonth()}`.padStart(2, `0`); // 0 based or indexed
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, `0`);
    // const min = `${now.getMinutes()}`.padStart(2, `0`);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`; // day/month/year
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add date movement
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);
      // Add date movement
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// converting to numbers
console.log(23 === 23.0);
console.log(Number(`23`));
console.log(+`23`);

// parsing - javascript picks the numbers
// redix - the base
console.log(Number.parseInt(`30px`, 10));
// the string needs to start with a number
console.log(Number.parseInt(`px30`)); //NaN
console.log(Number.parseFloat(`   2.5rem`, 10));

console.log(Number.isNaN(+`2x`));
console.log(Number.isNaN(23 / 0));
// Better for checking is a  or not number
console.log(Number.isFinite(20 / 0));
console.log(Number.isFinite(`20`));
console.log(Number.isFinite(+`20x`));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23 / 0));

// maths and rounding numbers
console.log(Math.sqrt(9));
console.log(25 ** (1 / 2));
console.log(25 ** (1 / 3));
console.log(Math.max(5, 18, `23`, 11, 2)); //no parsing
console.log(Math.min(5, 18, `23`, 11, 2));
console.log(Math.PI * Number.parseFloat(`10px`) ** 2);
console.log(Math.trunc(Math.random() * 6) + 1);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// rounding integers
// they all do type coersion
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.9));
console.log(Math.floor(-23.3));
// trunc and floor are similar for positive numbers
console.log(Math.trunc(-23.3));

// rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log(+(2.345).toFixed(2));

// The remainder operator
console.log(5 % 2);
console.log(6 % 2);
console.log(7 % 2);

const isEven = n => (n % 2 === 0 ? `even` : `odd`);
console.log(isEven(9));
console.log(isEven(8));

labelBalance.addEventListener(`click`, function () {
  [...document.querySelectorAll(`.movements__row`)].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = `orangered`;
    if (i % 2 === 0) row.style.backgroundColor = `blue`;
  });
});

// numeric separators
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// const PI = 3._1415 ❌
// console.log(Number(`2_300`)); ❌

// BIGINT
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(4903573204520395034573245072345072340523405n);
console.log(BigInt(4903573204520395034573245072345072340523405n));

// Operations
console.log(10_000n + 10000n);
console.log(4534890752450982374n * 403452837459n);
const num = 23;
const huge = 52804784847748487478n;
console.log(huge * BigInt(num));

// divisions
console.log(10n / 3n);
console.log(10 / 3);
*/
/*
// Creating dates
const now = new Date();
console.log(now);
console.log(new Date(`Aug 02 2020 18:05:41`));
console.log(new Date(`December 24, 2015`));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31)); // auto correct to december
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // a time stamp

// working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
// console.log(future.getYear()); //never use this ❌`
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // timestamp - miliseconds since Jan 1, 1970
console.log(new Date(future.getTime()));
console.log(Date.now()); // timestamp at this moment
future.setFullYear(2040);
console.log(future);
*/
/*
// operations with date
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

// (1000 * 60 * 60 * 24) => to secs, min, hr, day


const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

// working with international dates
console.log(new Intl.DateTimeFormat(`en-US`).format());

const num = 3828382020.23;

const options = {
  style: `currency`,
  unit: `celsius`,
  currency: `eur`,
};

console.log(`US:`, new Intl.NumberFormat(`en-US`, options).format(num));
console.log(`Germany:`, new Intl.NumberFormat(`de-DE`, options).format(num));
console.log(`Syria:`, new Intl.NumberFormat(`ar-SY`).format(num));
console.log(`Browser:`, new Intl.NumberFormat(navigator.language).format(num));
*/
/*
const ingredients = [`olives`, `spinach`];
const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza with ${ing1} and ${ing2}`);
  },
  3000,
  ...ingredients
);
console.log(`waiting`);

if (ingredients.includes(`spinach`)) clearTimeout(pizzaTimer);
// setinterval
setInterval(() => {
  const now = new Date();
  console.log(now);
  
}, 1000);
*/
// setting a countdown
