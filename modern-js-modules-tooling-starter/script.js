// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// addToCart(`bread`, 5);
// console.log(price, tq);

console.log(`Importing module`);
// import * as ShoppingCart from './shoppingCart.js'
// ShoppingCart.addToCart(`bread`, 5)

// import default as add
import add from './shoppingCart.js';
add(`bread`, 2);
add(`bread`, 5);
add(`bread`, 4);

import { cart } from './shoppingCart.js';
console.log(cart);

// top level await
// console.log(`Start fetching`);
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);
// console.log(`Something`);

const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// const lastPost = await getLastPost();
// console.log(lastPost);

import shoppingCart, { addToCart } from './shoppingCart';

// The module pattern
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart(`apple`, 4);
ShoppingCart2.addToCart(`pizza`, 2);

/*
// commonjs modules - works in nodejs
// Export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};
// Import
const {addToCart} = require('./shoppingCart.js')
*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: `bread`, quantity: 5 },
    { product: `pizza`, quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = cloneDeep(state);
console.log(stateClone);

console.log(state);
console.log(stateClone);

// Prevent page reload by parcel!!!
if (module.hot) {
  module.hot.accept();
}

import 'core-js/stable';

// polyfilling async functions
import 'regenerator-runtime/runtime';
