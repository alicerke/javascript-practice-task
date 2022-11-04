'use strict';

const modal = document.querySelector('#modalBG');
const btn = document.querySelector('#modalBtn');
const span = document.querySelector('.modal__close');
const okey = document.querySelector('#modalOkey');
const cancel = document.querySelector('#modalCancel');

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks on Okey, close the modal and clg-Okey
okey.onclick = function() {
  modal.style.display = 'none';
  console.log('Okey');
}

// When the user clicks on Cancel, close the modal and clg-Cancel
cancel.onclick = function() {
    modal.style.display = 'none';
    console.log('Cancel');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}