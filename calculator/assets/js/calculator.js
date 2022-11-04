'use strcit';

let calcString = '';
const numbersArr = [];
const operatorsArr = [];
let result = 0;

const keys = document.querySelectorAll('[data-value]');
const output = document.querySelector('.output');
const equal = document.querySelector('[data-equal]');
const clear = document.querySelector('[data-clear]');

const operatorsObj = {
    '+': (number1, number2) => (number1 + number2),
    '-': (number1, number2) => (number1 - number2),
    '*': (number1, number2) => (number1 * number2),
    '/': (number1, number2) => (number1 / number2)
};

// Reading numbers and operators into a string.
keys.forEach(keys => {
    keys.addEventListener('click', (event) => {
        calcString += event.target.dataset.value;
        writeOutput(calcString);
    });
});

// Writing numbers and operators into the output value input element.
function writeOutput(value) {
    output.value = value;
};

// Handling of pressing the equal sign button.
equal.addEventListener('click', () => {
    stringSort(calcString);
    numbersArr.forEach(item => {
        if (isNaN(item)) {
            clearAll();
            const error = 'Error';
            writeOutput(error);
        } else {
            resultOperations();
            writeOutput(result);
            clearAll();
        }
    });
});

// Clear button push handling.
clear.addEventListener('click', () => {
    clearAll();
    const clearOut = '';
    writeOutput(clearOut);
});

// Sorting strings containing numbers and operators into two arrays.
function stringSort(string) {
    let num = '';
    const acceptableSigns = ['+', '-', '/', '*'];
    for (let i = 0; i < string.length; i += 1) {
        if (acceptableSigns.indexOf(string[i]) === -1) {
            num += string[i];
        } else {
            numbersArr.push(parseFloat(num));
            num = '';
            operatorsArr.push(string[i]);
        };
    };
    numbersArr.push(parseFloat(num));
    return numbersArr, operatorsArr;
};

// Clearing all arrays and strings.
const clearAll = () => {
    numbersArr.splice(0, numbersArr.length);
    operatorsArr.splice(0, operatorsArr.length);
    calcString = '';
};

// Main function for calculating the result.
function resultOperations() {
    console.log(numbersArr);
    result = numbersArr[0];
    operatorsArr.forEach((item, index) => {
        result = operatorsObj[item](result, numbersArr[index + 1])
    });
    return result;
};