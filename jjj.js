const body = document.body;
let timerStarted = false; // Variable to track if the timer has started
let flippedCards = [];
let isIcon = true;
let numberOfPlayers = 4;
let activePlayer = 1;
let playerScores = [];

function createRandomCardPairs(numPairs) {
    const page4x4 = document.querySelector('.page-4x4');
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    for (let i = 0; i < numberOfPlayers; i++) {
        playerScores[i] = 0;
        console.log(playerScores)
    }

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
    // status.innerHTML = statusCount;

    page4x4.appendChild(gridContainer);
    page4x4.appendChild(status);

    const numbers = generateRandomPairs(numPairs);
    const icons = generateRandomIconPairs(numPairs * 2);
    
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


        if(isIcon){
            const cardIcon = document.createElement('i');
            cardIcon.classList.add('fas', icons[i]);
            cardFront.appendChild(cardIcon);
        }else{
            const cardNumber = document.createElement('h2');
            cardNumber.textContent = numbers[i];
            cardFront.appendChild(cardNumber);
        }
        

        card.appendChild(cardBack);
        card.appendChild(cardFront);
        gridItem.appendChild(card);
        gridContainer.appendChild(gridItem);
    }
    flipCard();
    multiplayerStatus(numberOfPlayers);
    // startTimer()
}

let winCount = 0;
const multiplayerStatus = (numberOfPlayers) =>{
    const status = document.querySelector('.status');
    if(numberOfPlayers < 2){
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
    }else{
        for(let i = 1; i <= numberOfPlayers; i++){
            
            status.style.width = 'auto'
            const player = document.createElement('div');
            player.classList.add('single-player');
            
            const playerNum = document.createElement('p');
            playerNum.innerText = 'player '+ i;
    
            const playerWinCount = document.createElement('h2');
            playerWinCount.innerText = '0';
            
            status.append(player);
            player.append(playerNum);
            player.append(playerWinCount);
            if (i === activePlayer){
                player.classList.add('active-player');
                playerNum.classList.add('active-player');
                playerWinCount.classList.add('active-player');
            }
        }
    }
}

console.log(playerScores[1])
const switchToNextPlayer = () => {
    document.querySelector('.single-player.active-player').classList.remove('active-player');
    activePlayer = (activePlayer % numberOfPlayers) + 1;
    document.querySelector('.single-player:nth-child(' + activePlayer + ')').classList.add('active-player');
};


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

function generateRandomIconPairs(numPairs) {
    const iconClasses = [
        'fa-heart',
        'fa-star',
        'fa-smile',
        'fa-thumbs-up',
        'fa-bell',
        'fa-coffee',
        'fa-sun',
        'fa-moon',
        'fa-music',
        'fa-leaf',
        'fa-tree',
        'fa-car',
        'fa-plane',
        'fa-bicycle',
        'fa-gift',
        'fa-umbrella',
        'fa-camera',
        'fa-globe',
        'fa-lightbulb',
        'fa-paper-plane',
        'fa-rocket',
        'fa-graduation-cap',
        'fa-trophy',
        'fa-key',
        // Add more unique icons here
    ];
    
    if (numPairs > iconClasses.length) {
        console.warn("Warning: Not enough unique icon classes for the requested pairs.");
        return [];
    }

    // Randomly select unique icon classes
    const uniqueIconClasses = iconClasses.slice(0); // Create a copy of the array
    const selectedIconClasses = [];

    while (selectedIconClasses.length < numPairs) {
        const randomIndex = Math.floor(Math.random() * uniqueIconClasses.length);
        const iconClass = uniqueIconClasses.splice(randomIndex, 1)[0]; // Remove the selected icon class
        selectedIconClasses.push(iconClass, iconClass); // Create pairs of the same icon
    }

    // Shuffle the selected icon classes
    for (let i = selectedIconClasses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedIconClasses[i], selectedIconClasses[j]] = [selectedIconClasses[j], selectedIconClasses[i]];
    }

    return selectedIconClasses;
}


// function generateRandomIconPairs(numPairs) {
//     const iconClasses = ['fa-heart', 'fa-star', 'fa-smile', 'fa-thumbs-up', 'fa-bell', 'fa-coffee', 'fa-sun', 'fa-moon'];

//     const icons = [];

//     // Select pairs of icons
//     for (let i = 0; i < numPairs; i++) {
//         const randomIndex = Math.floor(Math.random() * iconClasses.length);
//         const iconClass = iconClasses[randomIndex];
//         icons.push(iconClass, iconClass); // Create pairs of the same icon
//         console.log(randomIndex);
//     }

//     // Shuffle the icons
//     for (let i = icons.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [icons[i], icons[j]] = [icons[j], icons[i]];
//     }
//     return icons;
// }


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


                const childNodes = document.querySelectorAll('.card-front');
                const eachChill = Array.from(childNodes).map(child => {
                    const oneChild = child.querySelector('i');
                    return oneChild;
                });

                if (flippedCards.length === 2) {
                    clickable = false; // Disable further clicks
                    const [card1, card2] = flippedCards;
                    // const number1 = card1.querySelector('h2').innerText;
                    const icon1 = card1.querySelector('i').classList[1]; // Get the Font Awesome class
                    // const number2 = card2.querySelector('h2').innerText;
                    const icon2 = card2.querySelector('i').classList[1]; // Get the Font Awesome class
                
                    if ( icon1 === icon2) {
                        // Matching pair, keep cards flipped
                        flippedCards = [];
                        const playerWinCount = document.querySelector('.player.active-player h2')
                        
                        // Increment the score of the active player
                        playerScores[activePlayer - 1]++; // Subtract 1 because player numbers are 1-based     


                        playerWinCount.innerText = playerScores[activePlayer - 1];
                        // switchToNextPlayer();
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
                            switchToNextPlayer();
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
    popRestartBtn.classList.add('popup-btn');
    popRestartBtn.innerText = 'Restart'
    popRestartBtn.id = 'popup-restart';
    
    const popNewGameBtn = document.createElement('button');
    popNewGameBtn.classList.add('popup-btn');
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



let x = window.matchMedia("(max-width: 430px)")

const mobileMenu = () =>{
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');
    
    const menu = document.createElement('div');
    menu.classList.add('popup-content');
    menu.classList.add('menu');

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('menu-btns')

    const menuRestart = document.createElement('button');
    menuRestart.id = 'menu-restart';
    menuRestart.innerText = 'Restart';
    
    const menuNewGame = document.createElement('button');
    menuNewGame.id = 'menu-newGame';
    menuNewGame.innerText = 'New Game';
    
    const menuResume = document.createElement('button');
    menuResume.id = 'menu-resume';
    menuResume.innerText = 'Resume Game';



    body.append(menuContainer);
    menuContainer.append(menu);
    menu.append(btnContainer);
    btnContainer.append(menuRestart,menuNewGame,menuResume)
    // menuRestart();
}

const menuBtn = () =>{
    const menuBtn = document.getElementById('menu');
    const menuContainer = document.querySelector('.menu-container');
    menuBtn.addEventListener('click', () =>{
        // mobileMenu();
        menuContainer.classList.toggle('show')
        menuRestart();
        menuNewGame();
        resumeBtn();
        // alert('here')
    })
};


// const endGameMultiPopup = (numberOfPlayers) => {
//     const popupContainer = document.createElement('div')
//     popupContainer.classList.add('popup-container');
    
//     const popUp = document.createElement('div')
//     popUp.classList.add('popup-content');
//     popUp.classList.add('multiplayer-popup');

//     const h1 = document.createElement('h1');
//     h1.innerText = `Player ${playerScores.max} wins!`;
    
//     const gameOverNB = document.createElement('p');
//     gameOverNB.innerText = 'Game over! Here’s how you got on…';

//     popUp.append(h1, gameOverNB)
    
//     for (let i = 1; i <= numberOfPlayers; i++) {
//         const playerScore = document.createElement('div');
//         playerScore.classList.add('info');

//         const player = document.createElement('p')
//         player.innerText = 'Player ' + i;

//         const score = document.createElement('h1')
//         score.innerText = playerScores[i - 1] + ' Pairs'; 


        
//         playerScore.append(player,score);
//         popUp.append(playerScore); 
//     }
    
    
    
    
//     popupContainer.append(popUp);
//     body.append(popupContainer);
//     // btnContainer.append(popRestartBtn, popNewGameBtn);

// }
const endGameMultiPopup = (numberOfPlayers) => {
    const popupContainer = document.createElement('div')
    popupContainer.classList.add('popup-container');
    
    const popUp = document.createElement('div')
    popUp.classList.add('popup-content');
    popUp.classList.add('multiplayer-popup');

    const h1 = document.createElement('h1');

    // const maxScore = Math.max(...playerScores);

    
    const maxScoreIndex = playerScores.indexOf(Math.max(...playerScores));
    if (playerScores.filter(score => score === playerScores[maxScoreIndex]).length === 1) {
        h1.innerText = `Player ${maxScoreIndex + 1} wins!`;
    } else {
        h1.innerText = "It's a tie!";
    }

    // const winners = playerScores.reduce((acc, score, index) => {
    //     if (score === maxScore) {
    //         acc.push(index + 1);
    //     }
    //     return acc;
    // }, []);

    // if (winners.length === 1) {
    //     h1.innerText = `Player ${winners[0]} wins!`;
    // } else {
    //     h1.innerText = "It's a tie!";
    // }

    // console.log(maxNumber);

    //h1.innerText = `Player ${maxScoreIndex + 1} wins!`;

    // Move the player with the highest score to the front
    const playersOrder = [maxScoreIndex, ...Array.from({ length: numberOfPlayers }, (_, i) => i).filter(i => i !== maxScoreIndex)];

    
    const gameOverNB = document.createElement('p');
    gameOverNB.innerText = 'Game over! Here are the results…';


    popUp.append(h1, gameOverNB)
    
    // for (let i = 1; i <= numberOfPlayers; i++) {
    //     const playerScore = document.createElement('div');
    //     playerScore.classList.add('info');

    //     const player = document.createElement('p')
    //     player.innerText = 'Player ' + i;

    //     const score = document.createElement('h1')
    //     score.innerText = playerScores[i - 1] + ' Pairs'; 

    //     if (winners.includes(i)) {
    //         playerScore.style.background = '#152938';
    //         player.innerText += '{Winner!}'
    //         player.style.color = '#fff';
    //         score.style.color = '#fff';
    //     } 
        
    //     playerScore.append(player,score);
    //     popUp.append(playerScore); 
    // }
    for (const i of playersOrder) {
        const playerScore = document.createElement('div');
        playerScore.classList.add('info');

        const player = document.createElement('p');
        player.innerText = 'Player ' + (i + 1);

        const score = document.createElement('h1');
        score.innerText = playerScores[i] + ' Pairs'; 

        if (i === maxScoreIndex) {
            playerScore.style.background = '#152938';
            player.innerText += ' {Winner!}';
            player.style.color = '#fff';
            score.style.color = '#fff';
        } 
        
        playerScore.append(player, score);
        popUp.append(playerScore); 
    }
    
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    
    const popRestartBtn = document.createElement('button');
    popRestartBtn.classList.add('popup-btn');
    popRestartBtn.innerText = 'Restart'
    popRestartBtn.id = 'popup-restart';
    
    const popNewGameBtn = document.createElement('button');
    popNewGameBtn.classList.add('popup-btn');
    popNewGameBtn.innerText = 'Setup New Game';
    popNewGameBtn.id = 'popup-new-game';
    
    popUp.append(btnContainer)
    btnContainer.append(popRestartBtn, popNewGameBtn)
    popupContainer.append(popUp);
    body.append(popupContainer);
    // btnContainer.append(popRestartBtn, popNewGameBtn);

    
    popupNewGame();
    popupRestart();

}

const menuRestart = ()=>{
    // const popupRestart = document.getElementById('popup-restart');
    const menuRestart = document.getElementById('menu-restart');

    menuRestart.addEventListener('click', () =>{
        location.reload();
    })


};

const resumeBtn = () =>{
    const resumeBtn = document.getElementById('menu-resume');
    const menuContainer = document.querySelector('.menu-container');
    resumeBtn.addEventListener('click', () =>{
        menuContainer.classList.remove('show');
    })

}


const menuNewGame = () =>{
    const newGameBtn = document.getElementById('menu-newGame');

    newGameBtn.addEventListener('click', ()=>{
        // body.classList.remove('new-color');
        // setup.classList.remove('display');
        // localStorage.removeItem('gridCreated');
        location.reload();
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    createRandomCardPairs(8);
    if(x.matches){
        mobileMenu();
        menuBtn();
        // console.log('jjfgj')
    }
    endGameMultiPopup(numberOfPlayers);
    // menuRestart();
    // resumeBtn();
    // flipCard();
    // endGamePopup()
    console.log(generateRandomIconPairs())
    
    const childNodes = document.querySelectorAll('.card-front');
    const eachChill = Array.from(childNodes).map(child => {
        const oneChild = child.querySelector('i');
        return oneChild;
    });

    if (eachChill.some(child => child)) {
        console.log(eachChill);
    }
    
})