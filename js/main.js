// console.log('Testing')

// 1- add event listerns to the cards
// 2- make the flip once clicked
// 3-not possible to click in the same pic twice in a row
// 4- switch player every two cards clickes 
// 5- flip last two cards once hide button was clicked
// 6- count pair matches
// 7- winning conditionals
// 8- restart button unflips all cards at once and restart players count
// 9- display winning message


// variables to compare the match later
let cardOne, cardTwo;
let isCardFlipped = false;
let isBoardLocked = false;




// dom elements
// selecting all the cards
const cardsEl = document.querySelectorAll('.cards')

function cardFlip(evt) {
    const evtClicked = evt.target.parentElement  //parentElement to grab the div with class of cards
    // console.log(evtClicked)
    // console.log('I was clicked')
    evtClicked.classList.toggle('flip')

}

// iterating through all the cards and adding an event listener to it
cardsEl.forEach(function (card) {
    card.addEventListener('click', cardFlip)
})




