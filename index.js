const body = document.body;
const startGame = document.getElementById('start');
const setup = document.querySelector('.setup-page');
const gridCreated = localStorage.getItem('gridCreated');
let timerStarted = false; // Variable to track if the timer has started
let flippedCards = [];
let movesCount = 0; // Initialize the moves count
const value4x4 = document.getElementById('4x4-grid').value;
const value6x6 = document.getElementById('6x6-grid').value;
const number4x4 = document.getElementById('theme-numbers');
const icon4x4 = document.getElementById('theme-icons');

let isIcon;
let seconds = 0;
console.log(number4x4)
console.log(icon4x4)
// const shufflefun = ()=>{
// };

// function for the setup page
const setupFor4Grid = () =>{
    // const checked = document.querySelectorAll('input[type = "radio"]:checked')
    startGame.addEventListener('click', ()=>{
    
        const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
    
        const isNumbers = Array.from(checkedRadios).some(radio => radio.value === 'numbers');
        const isIcons = Array.from(checkedRadios).some(radio => radio.value === 'icons');
        const isOnePlayer = Array.from(checkedRadios).some(radio => radio.value === '1');
        const isTwoPlayers = Array.from(checkedRadios).some(radio => radio.value === '2');
        const isThreePlayers = Array.from(checkedRadios).some(radio => radio.value === '3');
        const isFourPlayers = Array.from(checkedRadios).some(radio => radio.value === '4');
        const is4x4Grid = Array.from(checkedRadios).some(radio => radio.id === '4x4-grid');
        const is6x6Grid = Array.from(checkedRadios).some(radio => radio.id ==='6x6-grid');
        if (is4x4Grid) {
            if(isNumbers){
                isIcon = false;
                createCards(value4x4);
                if(isOnePlayer){
                    multiplayerStatus(1)
                }else if(isTwoPlayers){
                    multiplayerStatus(2)
                }else if(isThreePlayers){
                    multiplayerStatus(3)
                }else if(isFourPlayers){
                    multiplayerStatus(4)
                }
            }else{
                isIcon = true;
                createCards(value4x4);
                if(isOnePlayer){
                    multiplayerStatus(1)
                }else if(isTwoPlayers){
                    multiplayerStatus(2)
                }else if(isThreePlayers){
                    multiplayerStatus(3)
                }else if(isFourPlayers){
                    multiplayerStatus(4)
                }
            }
           
            console.log('All conditions are true');
            body.classList.add('new-color');
            setup.classList.add('display');
            
            restartGame();
            newGame();
            if(x.matches){
                mobileMenu();
                menuBtn();
                // console.log('jjfgj')
            }
            // location.reload();
        }else if(is6x6Grid){
            if(isNumbers){
                isIcon = false;
                createCards(value6x6);
                if(isOnePlayer){
                    multiplayerStatus(1)
                }else if(isTwoPlayers){
                    multiplayerStatus(2)
                }else if(isThreePlayers){
                    multiplayerStatus(3)
                }else if(isFourPlayers){
                    multiplayerStatus(4)
                }
            }else{
                isIcon = true;
                createCards(value6x6);
                if(isOnePlayer){
                    multiplayerStatus(1)
                }else if(isTwoPlayers){
                    multiplayerStatus(2)
                }else if(isThreePlayers){
                    multiplayerStatus(3)
                }else if(isFourPlayers){
                    multiplayerStatus(4)
                }
            }
            // alert('Coming Soon!');
            body.classList.add('new-color');
            setup.classList.add('display');
            restartGame();
            newGame();
            if(x.matches){
                mobileMenu();
                menuBtn();
                // console.log('jjfgj')
            }
        }
    });
}

// function for the click and flip events
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

                const childNode = document.querySelectorAll('.card-front');
                const eachChild = Array.from(childNode).map(child => {
                    const oneChild = child.querySelector('h2');
                    return oneChild;
                });

                if (flippedCards.length === 2 && eachChild.some(child => child)) {
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
                } else if (flippedCards.length === 2) {
                    clickable = false; // Disable further clicks
                    const [card1, card2] = flippedCards;
                    // const number1 = card1.querySelector('h2').innerText;
                    const icon1 = card1.querySelector('i').classList[1]; // Get the Font Awesome class
                    // const number2 = card2.querySelector('h2').innerText;
                    const icon2 = card2.querySelector('i').classList[1]; // Get the Font Awesome class
                    const moves = document.getElementById('move-count')
                    movesCount++; // Increment the moves count

                    moves.innerText = movesCount;
                    if ( icon1 === icon2) {
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
                };
                
                if (!timerStarted) {
                    startTimer();
                    timerStarted = true;
                }
                if (areAllCardsFlipped()) {
                    clearInterval(timeInterval); // Stop the timer if all cards are flipped
                    endGamePopup(seconds);
                }
            }
        });
    });
}

// Pop-up function
const endGamePopup = (seconds)=>{
    const popupContainer = document.createElement('div')
    popupContainer.classList.add('popup-container'); 
    popupContainer.classList.add('show'); 

    const popUp = document.createElement('div')
    popUp.classList.add('popup-content');
    
    const h1 = document.createElement('h1');
    h1.innerText = 'You did it!';
    
    const gameOverNB = document.createElement('p');
    gameOverNB.innerText = 'Game over! Here’s how you got on…';


        // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    

    const timeElapsed = document.createElement('div');
    timeElapsed.classList.add('info');
    const time = document.createElement('p')
    time.innerText = 'Time Elapsed'
    const elapse = document.createElement('h1')
    elapse.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;


    const movesTaken = document.createElement('div');
    movesTaken.classList.add('info');
    const moves = document.createElement('p')
    moves.innerText = 'Moves Taken'
    const count = document.createElement('h1')
    count.innerText = `${movesCount} Moves`;
    
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
    timeElapsed.append(time,elapse);
    movesTaken.append(moves,count);

    popupNewGame();
    popupRestart();

}


// function for the popup new game btn
const popupNewGame = ()=>{
   const popupContainer = document.querySelector('.popup-container')
    const popNewGame = document.getElementById('popup-new-game');

    popNewGame.addEventListener('click', () =>{
       popupContainer.style.display = 'none';
       localStorage.removeItem('gridCreated');
       location.reload();
    });
};

// function for the popup restart game btn
const popupRestart = ()=>{
    const popupRestart = document.getElementById('popup-restart');
    const menuRestart = document.getElementById('menu-restart');

    popupRestart.addEventListener('click', () =>{
        location.reload();
    });
    menuRestart.addEventListener('click', () =>{
        location.reload();
    });
};

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

// function for retart game btn on main page
const restartGame = ()=>{
    const restartGame = document.getElementById('restart');

    restartGame.addEventListener('click', () =>{
        location.reload();
    });
};

// function for retart game btn on main page
const newGame = () =>{
    const newGameBtn = document.getElementById('new-game');

    newGameBtn.addEventListener('click', ()=>{
        body.classList.remove('new-color');
        setup.classList.remove('display');
        localStorage.removeItem('gridCreated');
        location.reload();
    })
}

// function for creating the card
// Call the function with the number of cards you want to create
function createCards(numPairs) {
    const page4x4 = document.createElement('div')
    page4x4.classList.add('page-4x4')
    let headerContainer = `  <div class="header">
        <div class="logo"><p>memory</p></div>
        <div class="buttons">
            <button id="restart">Restart</button>
            <button id="new-game">New Game</button>
            <button id="menu">Menu</button>
        </div>
        </div>`
    page4x4.innerHTML = headerContainer;
    const gridContainer = document.createElement('div')
    gridContainer.classList.add('grid-container')

    const status = document.createElement('div')
    status.classList.add('status')
    // let statusCount = `
    //     <div class="count" id="time">
    //             <h3>Time</h3>
    //             <div class="timer">
    //                 <label id="minutes">00</label> <label for="">:</label> <label id="seconds">00</label>
    //             </div>
    //         </div>
    //         <div class="count" id="moves">
    //             <h3>moves</h3>
    //             <p id ="move-count">0</p>
    //     </div>`
    
    //     status.innerHTML = statusCount;

    const numbers = generateRandomPairs(numPairs);
    const icons = generateRandomIconPairs(numPairs * 2);
    let numberOfPlayerp = 2 ;


        if(numPairs=== value4x4){
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
        
                // const cardNumber = document.createElement('h2');
                // cardNumber.textContent = numbers[i];
                // cardFront.appendChild(cardNumber);
                body.append(page4x4);
                page4x4.append(gridContainer);
                page4x4.append(status)
                card.appendChild(cardBack);
                card.appendChild(cardFront);
                gridItem.appendChild(card);
                gridContainer.appendChild(gridItem);
                if(isIcon){
                    const cardIcon = document.createElement('i');
                    cardIcon.classList.add('fas', icons[i]);
                    cardFront.appendChild(cardIcon);
                    localStorage.setItem('gridCreated', '4x4grid-icons');
                    // flipCard();
                    console.log(isIcon)
                }else{
                    const cardNumber = document.createElement('h2');
                    cardNumber.textContent = numbers[i];
                    cardFront.appendChild(cardNumber);
                    localStorage.setItem('gridCreated', '4x4grid');
                    // flipCard();
                }
            }
            // multiplayerStatus(numberOfPlayerp);
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
                cardFront.classList.add('card-front-6x6');
        
                if(isIcon){
                    const cardIcon = document.createElement('i');
                    cardIcon.classList.add('fas', icons[i]);
                    cardFront.appendChild(cardIcon);
                    localStorage.setItem('gridCreated', '6x6grid-icons');
                    // flipCard();
                    console.log(isIcon)
                }else{
                    const cardNumber = document.createElement('h2');
                    cardNumber.textContent = numbers[i];
                    cardFront.appendChild(cardNumber);
                    localStorage.setItem('gridCreated', '6x6grid');
                    // flipCard();
                }
                body.append(page4x4);
                page4x4.append(gridContainer);
                page4x4.append(status)
                card.appendChild(cardBack);
                card.appendChild(cardFront);
                gridItem.appendChild(card);
                gridContainer.appendChild(gridItem);
            }
        }
        flipCard();
}


const multiplayerStatus = (numberOfPlayerp) =>{
    const status = document.querySelector('.status');
    if(numberOfPlayerp < 2){
        let statusCount = `
        <div class="count" id="time">
        <h3>Time</h3>
        <div class="timer">
        <label id="minutes">00</label> <label for="">:</label> <label id="seconds">00</label>
        </div>
        </div>
        <div class="count" id="moves">
        <h3>Moves</h3>
        <p id = "move-count">0</p>
        </div>`;
        
        status.innerHTML = statusCount;
    }else{
        for(let i = 1; i <= numberOfPlayerp; i++){
            status.style.width = 'auto'
            const player = document.createElement('div');
            player.classList.add('player');
            
            const playerNum = document.createElement('p');
            playerNum.innerText = 'player '+ i;
            
            const playerWinCount = document.createElement('h2');
            playerWinCount.innerText = '0 ';
            
            status.append(player);
            player.append(playerNum);
            player.append(playerWinCount);
        }
    }

}
    

// // function generating the random pair of numbers
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
        'fa-anchor',
        'fa-bolt',
        'fa-cloud',
        'fa-comments',
        'fa-cog',
        'fa-desktop',
        'fa-envelope',
        'fa-futbol',
        'fa-gem',
        'fa-hamburger',
        'fa-leaf',
        'fa-magic',
        'fa-paint-brush',
        'fa-paw',
        'fa-recycle',
        'fa-shoe-prints',
        'fa-space-shuttle',
        'fa-stethoscope',
        'fa-trophy',
        'fa-umbrella',
        'fa-wheelchair',
        'fa-wine-glass',
        'fa-yin-yang',
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



// function for starting the time count
let timeInterval;
function startTimer() {

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


let x = window.matchMedia("(max-width: 420px)")

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

const menuRestart = ()=>{
    // const popupRestart = document.getElementById('popup-restart');
    const menuRestart = document.getElementById('menu-restart');

    menuRestart.addEventListener('click', () =>{
        location.reload();
    })


};

const menuNewGame = () =>{
    const menuContainer = document.querySelector('.menu-container');
    const newGameBtn = document.getElementById('menu-newGame');

    newGameBtn.addEventListener('click', ()=>{
        menuContainer.classList.remove('show')
        body.classList.remove('new-color');
        setup.classList.remove('display');
        localStorage.removeItem('gridCreated');
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

// content displayed when the paeg is loaded
document.addEventListener('DOMContentLoaded',()=>{
    
    // endGamePopup(seconds);
    setupFor4Grid();

    if (gridCreated === '4x4grid') {
        // The grid has been created, so show it
        console.log('All conditions are true');
        body.classList.add('new-color');
        setup.classList.add('display');
        createCards(value4x4); 
    }else if (gridCreated === '4x4grid-icons') {
        // The grid has been created, so show it
        isIcon = true;
        console.log('All conditions are true');
        body.classList.add('new-color');
        setup.classList.add('display');
        createCards(value4x4); 
    }else if (gridCreated === '6x6grid') {
        // The grid has been created, so show it
        console.log('All conditions are true');
        body.classList.add('new-color');
        setup.classList.add('display');
        createCards(value6x6); 
    }else if(gridCreated === '6x6grid-icons'){
        isIcon = true;
        body.classList.add('new-color');
        setup.classList.add('display');
        createCards(value6x6);
    }
    restartGame()
    newGame();
    if(x.matches){
        mobileMenu();
        menuBtn();
        // console.log('jjfgj')
    }

    console.log(isIcon)

    // Replace 16 with the desired number of cards
})


