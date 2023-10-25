const body = document.body;
const startGame = document.getElementById('start');
const setup = document.querySelector('.setup-page');
const gridCreated = localStorage.getItem('gridCreated');
let timerStarted = false; // Variable to track if the timer has started
let flippedCards = [];
let movesCount = 0; // Initialize the moves count
const value4x4 = document.getElementById('4x4-grid').value;
const value6x6 = document.getElementById('6x6-grid').value;

// const shufflefun = ()=>{
// };


const setupFor4Grid = () =>{
    // const checked = document.querySelectorAll('input[type = "radio"]:checked')
    startGame.addEventListener('click', ()=>{
    
        const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
    
        const isNumbers = Array.from(checkedRadios).some(radio => radio.value === 'numbers');
        const isOnePlayer = Array.from(checkedRadios).some(radio => radio.value === '1');
        const is4x4Grid = Array.from(checkedRadios).some(radio => radio.id === '4x4-grid');
        const is6x6Grid = Array.from(checkedRadios).some(radio => radio.id ==='6x6-grid');
        if (isNumbers && isOnePlayer && is4x4Grid) {
            console.log('All conditions are true');
            body.classList.add('new-color');
            setup.classList.add('display');
            
            createCards(value4x4);
            newGame();
            // location.reload();
        }else if(isNumbers && isOnePlayer && is6x6Grid){
            // alert('Coming Soon!');
            body.classList.add('new-color');
            setup.classList.add('display');
            createCards(value6x6);
            newGame();
        }else{
            alert('Coming Soon!');
        }
    });
}


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
                    const moves = document.getElementById('move-count')
                   
                    movesCount++; // Increment the moves count
                    moves.innerText = movesCount;
                    if (number1 === number2) {
                        // Matching pair, keep cards flipped
                        flippedCards = [];
                        card1.querySelector('.card-front').style.background = '#FDA214';
                        card2.querySelector('.card-front').style.background = '#FDA214';
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
                if (areAllCardsFlipped()) {
                    clearInterval(timeInterval); // Stop the timer if all cards are flipped
                }
            }
        });
    });
}
// Pop-up function
const endGamePopup = ()=>{
    
}

// This function runs and returns true if all cards are flipped
const areAllCardsFlipped = ()=> {
    const cards = document.querySelectorAll('.card');
    for (const card of cards) {
        if (card.getAttribute('data-flipped') !== 'true') {
            return false; // If any card is not flipped, return false
        }
    }
    return true; // All cards are flipped
}
const newGame = () =>{
    const newGameBtn = document.getElementById('new-game');

    newGameBtn.addEventListener('click', ()=>{
        body.classList.remove('new-color');
        setup.classList.remove('display');
        localStorage.removeItem('gridCreated');
        location.reload();
    })
}

// Call the function with the number of cards you want to create

function createCards(numPairs) {
    const page4x4 = document.createElement('div')
    page4x4.classList.add('page-4x4')
    let headerContainer = `  <div class="header">
        <div class="logo"><p>memory</p></div>
        <div class="buttons">
            <button id="restart">Restart</button>
            <button id="new-game">New Game</button>
        </div>
        </div>`
    page4x4.innerHTML = headerContainer;
    const gridContainer = document.createElement('div')
    gridContainer.classList.add('grid-container')

    const status = document.createElement('div')
    status.classList.add('status')
    let statusCount = `
        <div class="count" id="time">
                <h3>Time</h3>
                <div class="timer">
                    <label id="minutes">00</label> <label for="">:</label> <label id="seconds">00</label>
                </div>
            </div>
            <div class="count" id="moves">
                <h3>moves</h3>
                <p id ="move-count">0</p>
        </div>`
        
        status.innerHTML = statusCount;

    const numbers = generateRandomPairs(numPairs);

    if(numPairs === value4x4){

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
            body.append(page4x4);
            page4x4.append(gridContainer);
            page4x4.append(status)
            card.appendChild(cardBack);
            card.appendChild(cardFront);
            gridItem.appendChild(card);
            gridContainer.appendChild(gridItem);
        }
        flipCard();

    }else if(numPairs === value6x6){
        
        for (let i = 0; i < numPairs * 2; i++) {
            gridContainer.classList.add('grid-container-6x6');
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.classList.add('grid-item-6x6');

    
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
            body.append(page4x4);
            page4x4.append(gridContainer);
            page4x4.append(status)
            card.appendChild(cardBack);
            card.appendChild(cardFront);
            gridItem.appendChild(card);
            gridContainer.appendChild(gridItem);
        }
        flipCard();
    }else{
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
            body.append(page4x4);
            page4x4.append(gridContainer);
            page4x4.append(status)
            card.appendChild(cardBack);
            card.appendChild(cardFront);
            gridItem.appendChild(card);
            gridContainer.appendChild(gridItem);
        }
        flipCard();
    }
    localStorage.setItem('gridCreated', 'true');
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
let timeInterval;

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
    timeInterval = setInterval(handler, 1000);


}


document.addEventListener('DOMContentLoaded',()=>{
    setupFor4Grid();

    // if (gridCreated === 'true') {
    //     // The grid has been created, so show it
    //     console.log('All conditions are true');
    //     body.classList.add('new-color');
    //     setup.classList.add('display');
    //     createCards(8); 
    // } 
    newGame();
    
    // Replace 16 with the desired number of cards
})


// declear a timeInterval variable(done)
// start timer and stare in the varirable above(done)
// create a function and call the variable and clear the "interval"(done)
// call the function if all cards are flipped(done)