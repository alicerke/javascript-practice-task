'use strict';

const form = document.querySelector('form');

form.addEventListener('submit', event => {

    const feet = parseInt(document.querySelector('#feet').value);
    const inches = parseInt(document.querySelector('#inches').value);
    const result = document.querySelector('span.converter__result');

    event.preventDefault();

    if (isNaN(feet) || isNaN(inches)) {
        result.textContent = 'Kérlek adja meg \"Feet\" és \"Inches\" értéket.';
    } else if ( feet < 0 ) {
        result.textContent = 'Az \"Feet\" nem lehet negatív szám.';
    } else if ( inches < 0 || inches > 11) {
        result.textContent = 'Az \"Inches\"-nek 0 és 11 közötti értéket lehet csak adni! ( Mert 12 \"Inches\" az 1 \"Feet\"!)';
    } else {
        const height = ((feet*12)+inches)*2.54;

        result.textContent = Math.round(height) + ' cm';
        document.querySelector('#feet').value = '';
        document.querySelector('#inches').value = '';
    }
    
})
