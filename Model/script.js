'use strict';

const model = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnclosemodel = document.querySelector('.close-modal');
const btnOpneModel = document.querySelectorAll('.show-modal');
console.log(model);
console.log(overlay);

for (let i = 0; i < btnOpneModel.length; i++)
  btnOpneModel[i].addEventListener('click', function () {
    console.log('Button clicked');
    model.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

const closemenu = function () {
  model.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnclosemodel.addEventListener('click', closemenu);
overlay.addEventListener('click', closemenu);

document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !model.classList.contains('hidden')) {
    closemenu();
  }
});
