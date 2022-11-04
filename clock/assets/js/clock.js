'use strict';

const getCurrentTime = (startTime) => {
    const currentDate = startTime ? new Date(startTime) : new Date();
    const hours = padNumbers(currentDate.getHours());
    const minutes = padNumbers(currentDate.getMinutes());
    const seconds = padNumbers(currentDate.getSeconds());

    return `${[hours, minutes, seconds].join(':')}`;
};

const padNumbers = (number) => {  
    return number < 10 ? `0${number}` : `${number}`;
};

setInterval( () => {
    const time = getCurrentTime();    
    const clockFace = document.querySelector('.clock__content');
    clockFace.textContent = time;
}, 1000 );

