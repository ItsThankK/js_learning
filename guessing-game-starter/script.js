'use strict';

// let domManupilation = (document.querySelector('.message').textContent =
//   'DOM Manipulated!');
// console.log(domManupilation);

document.querySelector('.check').addEventListener('click', function () {
  console.log(document.querySelector('.guess').value);
});

document.querySelector('body').style.backgroundColor = 'red';

// Modal window
document.querySelector('.modal-section').style.backgroundColor = "red";
