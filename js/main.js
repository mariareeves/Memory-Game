// variables to use later
let cardOne, cardTwo;
let isCardFlipped = false;
let isBoardLocked = false;
let counter = 0

// selecting all the cards
const cardsEl = document.querySelectorAll('.cards')
const startBtn = document.getElementById('start')
const timerDiv = document.querySelector('#timer')
const winMessage = document.querySelector('h2')
const divButtons = document.querySelector('.buttons')
const restartBtn = document.getElementById('restart')


startBtn.addEventListener('click', gameStart)
restartBtn.addEventListener('click', resetGame)



//functions

// iterate through all cards then add event listener
function gameStart() {
    hideButton()
    timerSeconds = 41
    countdown = setInterval(timerGame, 1000)


    cardsEl.forEach(function (card) {
        card.addEventListener('click', cardFlip)
    })
    shuffleCards()
}


function cardFlip(evt) {
    const evtClicked = evt.target.parentElement //parentElement to grab the div with class of cards

    if (isBoardLocked) return
    if (evtClicked === cardOne) return

    evtClicked.classList.add('flip')

    //first card click
    if (!isCardFlipped) {
        isCardFlipped = true
        cardOne = evtClicked
    } else {   //second card click
        cardTwo = evtClicked
        checkForMatch()

    }
}


//checking if cards match 
// if they do match remove the event listener 
// if they dont then remove the flip class

function checkForMatch() {
    if (cardOne.dataset.flag === cardTwo.dataset.flag) {
        stopFLip()
        console.log('Match')
        counter++
        winner()
    } else {
        unflipCards()
    }
}


// function to stop the event listener flip cards
function stopFLip() {
    cardOne.removeEventListener('click', cardFlip)
    cardTwo.removeEventListener('click', cardFlip)
    resetBoard()
}


// function to unflip the cards, adding settimeout so the cards can go back not immediatly
function unflipCards() {
    isBoardLocked = true
    setTimeout(() => {
        cardOne.classList.remove('flip')
        cardTwo.classList.remove('flip')
        resetBoard()
    }, 1200)
}

//function to reset the cardOne and cardTwo after the board was clicked 
function resetBoard() {
    [isCardFlipped, isBoardLocked] = [false, false]
    [cardOne, cardTwo] = [null, null]
}

//function to shuffle the cards 
function shuffleCards() {
    cardsEl.forEach(function (card) {
        let shufflePosition = Math.floor(Math.random() * 12)
        card.style.order = shufflePosition
    })
}



//timer


function timerGame() {
    stopGame()
    timerSeconds--
    timerDiv.innerHTML = `Timer: 00:${timerSeconds}`




}



// stop game
function stopGame() {
    if (timerSeconds <= 0 || timerSeconds <= 1) {
        clearInterval(countdown)
        cardsEl.forEach(function (card) {
            card.removeEventListener('click', cardFlip)
        })
        winMessage.innerHTML = 'Your time is up. Try it again'
        restartBtn.style.display = 'show'

    }
}


// function to display a win message
function winner() {
    if (counter === 6) {
        winMessage.innerHTML = 'Congratulations. You found all the flags!'
        clearInterval(countdown)


    }
}






//hiding start button once clicked 
function hideButton() {
    startBtn.style.display = 'none'
    divButtons.style.display = 'block'

}


// restart the game
function resetGame() {
    clearInterval(countdown)
    timerSeconds = 41
    countdown = setInterval(timerGame, 1000)
    counter = 0
    winMessage.innerHTML = ''
    cardsEl.forEach(function (card) {
        card.classList.remove('flip')
    })
    cardsEl.forEach(function (card) {
        card.addEventListener('click', cardFlip)
    })
    shuffleCards()
}
