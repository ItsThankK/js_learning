'use strict';

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
console.log(btnsOpenModal);

for (let i = 0; i < btnsOpenModal.length; i++) {
  const element = btnsOpenModal[i];
  element.addEventListener(
    "click", function() {
    console.log("button clicked");
    document.querySelector(".modal").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
  }
);
}

btnCloseModal.addEventListener("click", function() {
  document.querySelector('.modal').classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});
