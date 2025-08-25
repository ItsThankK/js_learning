'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

const openModalFunction = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalFunction = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  const element = btnsOpenModal[i];
  element.addEventListener('click', openModalFunction);
}

btnCloseModal.addEventListener('click', closeModalFunction);
overlay.addEventListener('click', closeModalFunction);

document.addEventListener('keydown', function (e) {
  if(e.key == "Escape") {
    closeModalFunction();
  }
});
