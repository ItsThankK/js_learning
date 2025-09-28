// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// addToCart(`bread`, 5);
// console.log(price, tq);

// console.log(`Importing module`);
// import * as ShoppingCart from './shoppingCart.js'
// ShoppingCart.addToCart(`bread`, 5)

// import default as add
import add from './shoppingCart.js';
add(`bread`, 2);
add(`bread`, 5);
add(`bread`, 4);

import {cart} from './shoppingCart.js'
console.log(cart);

