const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


let cardOne = null;
let cardTwo = null;
let matchedCards = [];
let score = 0;
let gameDisabled = false;



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add("card-back");

    // give it a class attribute for the value we are looping over
    newDiv.style.backgroundColor = color;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


function initializeGame() {
  cardOne = null;
  cardTwo = null;
  matchedCards = [];
  score = 0;
  document.querySelector("#score").innerText = "0";
  gameDisabled = false;
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.lastChild);
  }
  let shuffledColors = shuffle(COLORS);
  setTimeout(() => createDivsForColors(shuffledColors), 300);
}



document.querySelector("#new-game").addEventListener("click", (e) => {
  event.preventDefault();
  setTimeout(initializeGame, 200);
});


function match() {
  matchedCards.push(cardOne, cardTwo);
  cardOne = null;
  cardTwo = null;
  score += 2;
  document.querySelector("#score").innerText = score;
  // if (score = COLORS.length) {
  //
  // }
}


function noMatch() {
  cardOne.classList.add("card-back");
  cardTwo.classList.add("card-back");
  cardOne = null;
  cardTwo = null;
  gameDisabled = false;
}


function handleCardClick(event) {
  if (!matchedCards.includes(event.target) && !gameDisabled) {
    event.target.classList.toggle("card-back");

    if (cardOne === null) {
      cardOne = event.target;
    } else {
      if (cardOne === event.target) {
        cardOne = null;
      } else {
        cardTwo = event.target;
        if (cardOne.style.backgroundColor === cardTwo.style.backgroundColor) {
          match();
        } else {
          gameDisabled = true;
          setTimeout(noMatch, 1000);
        }
      }
    }
  }
}


initializeGame();
