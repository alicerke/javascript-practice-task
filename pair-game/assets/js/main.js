'use strict';
import {
    pairGamesVariables
} from './variables.js';


/* Creates the game board  */
const pairGamesBoard = {
    numberOfDivs: pairGamesVariables.numberOfCards,
    cardsDivs: [],
    createDiv(number) {
        const boardDiv = document.createElement('div');
        boardDiv.className = 'card';
        boardDiv.dataset.number = number;
        return boardDiv;
    },
    createChildDiv(clName) {
        const childDiv = document.createElement('div');
        childDiv.className = clName;
        return childDiv;
    },
    draws() {
        const board = document.getElementById('board');
        for (let i = 0; i < this.numberOfDivs; i += 1) {
            this.cardsDivs.push(this.createDiv(i));
            board.appendChild(this.cardsDivs[i]);
            this.cardsDivs[i].appendChild(this.createChildDiv('card__face card__face--front'));
            this.cardsDivs[i].appendChild(this.createChildDiv('card__face card__face--back'));
        }
    }
}

/* drawing board */
pairGamesBoard.draws();


const pairGames = {
    cards: document.querySelectorAll('.card'),
    backOfCards: pairGamesVariables.backOfCards,
    pairs: [],
    pairsDiv: [],
    counter: 0,
    suffle() {
        this.backOfCards.sort(() => Math.random() - 0.5);
    },
    flipped() {
        this.cards.forEach(card => card.addEventListener('click', flipCard));
    },
    blockClick() {
        this.cards.forEach(card => {
            card.classList.toggle('noclick')
        });
    },
    removeClasses() {
        this.cards.forEach(card => {
            card.classList.remove('is-flipped');
            card.childNodes[1].classList.remove(card.childNodes[1].classList[2]);
        });
    }

}

/* rotates the cards */
const flipCard = (event) => {
    const number = event.target.parentNode.dataset.number;
    pairGames.cards[number].classList.add('is-flipped');
    pairGames.pairs.push(pairGames.backOfCards[number]);
    pairGames.pairsDiv.push(pairGames.cards[number]);
    pairGames.cards[number].childNodes[1].classList.add(pairGames.backOfCards[number]);
    checkForMatch();
}

/* check if there is a match */
const checkForMatch = () => {
    if (pairGames.pairs.length === 2) {
        pairGames.blockClick();
        setTimeout(() => {
            pairGames.blockClick();
        }, 1000);
        if (pairGames.pairs[0] === pairGames.pairs[1]) {
            pairGames.pairs = [];
            pairGames.pairsDiv = [];
            pairGames.counter += 1;
            console.log(pairGames.counter);
            checkForWin();
        } else {
            setTimeout(() => {
                pairGames.pairsDiv[0].childNodes[1].classList.remove(pairGames.pairs[0]);
                pairGames.pairsDiv[1].childNodes[1].classList.remove(pairGames.pairs[1]);
                pairGames.pairsDiv[0].classList.remove('is-flipped');
                pairGames.pairsDiv[1].classList.remove('is-flipped');
                pairGames.pairs = [];
                pairGames.pairsDiv = [];
            }, 1000);

        }
    }
}

/* check if the game is over */
const checkForWin = () => {
    if (pairGames.counter === pairGames.backOfCards.length / 2) {
        stopper.stopTimer();
        pairGames.counter = 0;
        setTimeout(() => {
            alert(`You win! Your time is: ${stopper.clockFace.textContent}`);
            pairGames.removeClasses();
            startGame();
        }, 1000);
    }
}

/* created and operated by the stopwatch */
let time;
const stopper = {
    clockFace: document.querySelector('.time'),
    setTextContent() {
        this.clockFace.textContent = '00:00:00';
    },
    padNumbers(number) {
        return number < 10 ? `0${number}` : `${number}`;
    },
    timer() {
        let stopperTime = 0;
        time = setInterval(() => {
            stopperTime++;
            const seconds = stopper.padNumbers(stopperTime % 60);
            const minutes = stopper.padNumbers(Math.floor(stopperTime / 60) % 60);
            const hours = stopper.padNumbers(Math.floor(stopperTime / 3600));
            const time = `${[hours, minutes, seconds].join(':')}`
            stopper.clockFace.textContent = time;
        }, 1000);
        stopper.removeTimerListener();
        return time;
    },
    startTimer() {
        pairGames.cards.forEach(card => {
            card.addEventListener('click', this.timer);
        });
    },
    removeTimerListener() {
        pairGames.cards.forEach(card => {
            card.removeEventListener('click', this.timer);
        });
    },
    stopTimer() {
        clearInterval(time);
    }
}

/* collection of operations that start the game */
const startGame = () => {
    stopper.setTextContent();
    pairGames.suffle();
    pairGames.flipped();
    stopper.startTimer();
}

/* launching the game */
startGame();