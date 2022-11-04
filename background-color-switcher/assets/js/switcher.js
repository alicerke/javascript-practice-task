'use strict';

// 1. version
const gray = document.querySelector('.switcher--gray');

gray.onclick = function() {
    document.querySelector('body').style.background = '#5f5f5f';
}

// 2. version
document.querySelector('.switcher--blue').addEventListener('click', function() {
    document.querySelector('body').style.background = '#0011ff';
})

// 3. version

const body = document.querySelector('body');
const switcher = document.querySelectorAll('.switcher__bg')

switcher.forEach((switcher__bg) => {
    switcher__bg.addEventListener('click', function(e) {

        if (e.target.id === 'white'){
            body.style.background = e.target.id;
        }
        if (e.target.id === 'yellow'){
            body.style.background = e.target.id;
        }
    })
});
