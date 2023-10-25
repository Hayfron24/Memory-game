const body = document.body;
let timerStarted = false; // Variable to track if the timer has started
let flippedCards = [];

function createRandomCardPairs(numPairs) {
    const page4x4 = document.querySelector('.page-4x4');
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    const status = document.createElement('div');
    status.classList.add('status');
    let statusCount = `
        <div class="count" id="time">
            <h3>Time</h3>
            <div class="timer">
                <label id="minutes">00</label> <label for="">:</label> <label id="seconds">00</label>
            </div>
        </div>
        <div class="count" id="moves">
            <h3>Moves</h3>
            <p>0</p>
        </div>`;
    status.innerHTML = statusCount;

    page4x4.appendChild(gridContainer);
    page4x4.appendChild(status);

    const numbers = generateRandomPairs(numPairs);

    for (let i = 0; i < numPairs * 2; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-flipped', 'false');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardNumber = document.createElement('h2');
        cardNumber.textContent = numbers[i];
        cardFront.appendChild(cardNumber);

        card.appendChild(cardBack);
        card.appendChild(cardFront);
        gridItem.appendChild(card);
        gridContainer.appendChild(gridItem);
    }
    flipCard();
    // startTimer()
}

function generateRandomPairs(numPairs) {
    const numbers = [];

    for (let i = 1; i <= numPairs; i++) {
        numbers.push(i, i); // Create pairs of the same number
    }

    // Shuffle the numbers
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
}

// Call the function with the number of pairs you want to create
// createRandomCardPairs(8); // Replace 8 with the desired number of pairs

let clickable = true;
const flipCard = () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const isFlipped = card.getAttribute('data-flipped') === 'true';
            if (!isFlipped && clickable) {
                card.setAttribute('data-flipped', 'true');
                card.querySelector('.card-front').style.transform = 'rotateY(0deg)';
                card.querySelector('.card-back').style.transform = 'rotateY(180deg)';
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    clickable = false; // Disable further clicks
                    const [card1, card2] = flippedCards;
                    const number1 = card1.querySelector('h2').innerText;
                    const number2 = card2.querySelector('h2').innerText;

                    if (number1 === number2) {
                        // Matching pair, keep cards flipped
                        flippedCards = [];
                        setTimeout(() => {
                            clickable = true; // Enable clicks after a short delay
                        }, 1000);
                    } else {
                        // Not a matching pair, unflip the cards
                        setTimeout(() => {
                            card1.setAttribute('data-flipped', 'false');
                            card1.querySelector('.card-front').style.transform = 'rotateY(180deg)';
                            card1.querySelector('.card-back').style.transform = 'rotateY(0deg)';
                            card2.setAttribute('data-flipped', 'false');
                            card2.querySelector('.card-front').style.transform = 'rotateY(180deg)';
                            card2.querySelector('.card-back').style.transform = 'rotateY(0deg)';
                            flippedCards = [];
                            clickable = true; // Enable clicks
                        }, 1000);
                    }
                }
                if (!timerStarted) {
                    startTimer();
                    timerStarted = true;
                }
            }
        });
    });
}
const endGamePopup = ()=>{
    const popupContainer = document.createElement('div')
    popupContainer.classList.add('popup-container'); 
    popupContainer.classList.add('show'); 

    const popUp = document.createElement('div')
    popUp.classList.add('popup-content');
    
    const h1 = document.createElement('h1');
    h1.innerText = 'You did it!';
    
    const gameOverNB = document.createElement('p');
    gameOverNB.innerText = 'Game over! Here’s how you got on…';

    const timeElapsed = document.createElement('div');
    timeElapsed.classList.add('info');
    const time = document.createElement('p')
    time.innerText = 'Time Elapsed'
    const elapse = document.createElement('h1')
    elapse.innerText = '00:00'


    const movesTaken = document.createElement('div');
    movesTaken.classList.add('info');
    const moves = document.createElement('p')
    moves.innerText = 'Moves Taken'
    const count = document.createElement('h1')
    count.innerText = '39 Moves'
    
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const popRestartBtn = document.createElement('button');
    popRestartBtn.classList.add('btn');
    popRestartBtn.innerText = 'Restart'
    popRestartBtn.id = 'popup-restart';
    
    const popNewGameBtn = document.createElement('button');
    popNewGameBtn.classList.add('btn');
    popNewGameBtn.innerText = 'Setup New Game';
    popNewGameBtn.id = 'popup-new-game';


    body.append(popupContainer);
    popupContainer.append(popUp);
    popUp.append(h1, gameOverNB, timeElapsed, movesTaken, btnContainer);
    btnContainer.append(popRestartBtn, popNewGameBtn);
    timeElapsed.append(time,elapse)
    movesTaken.append(moves,count)
}

function startTimer() {
    let seconds = 0;

    let handler = function() {
        seconds++;
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;

        // Get references to the minute and second elements
        let minutesElement = document.getElementById("minutes");
        let secondsElement = document.getElementById("seconds");

        // Update the text content of the minute and second elements
        minutesElement.textContent = (min < 10 ? "0" + min : min);
        secondsElement.textContent = (sec < 10 ? "0" + sec : sec);
    };

    // Set the timer to update every second
    setInterval(handler, 1000);
}


document.addEventListener('DOMContentLoaded', ()=>{
    createRandomCardPairs(8);
    // flipCard();
    endGamePopup()
})