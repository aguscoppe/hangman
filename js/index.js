// FUNCTIONS
function selectWord() {
  const wordArray = [
    "BOLETO",
    "HAMACA",
    "PEPINO",
    "AVION",
    "PRINCIPIO",
    "ABOGADO",
    "CALZADO",
    "BEBIDA",
    "COMENTARIO",
    "SABIDURIA",
    "TELEVISION",
    "PINGUINO",
    "TERRIBLE",
    "TITERE",
    "COLMENA",
    "ACERTIJO",
    "RECETA",
    "CORTINA",
    "MAÑANA",
  ];
  const secretWord = wordArray[Math.floor(Math.random() * wordArray.length)];
  return secretWord;
}

function endGame(userWon) {
  const gameEndedDiv = document.querySelector("#game-ended");
  const gameEndedStatus = gameEndedDiv.querySelector("#game-ended-status");
  const gameEndedMsg = gameEndedDiv.querySelector("#game-ended-msg");
  let status = "";
  if (userWon) {
    status = "Ganaste 😊";
  } else {
    status = "Perdiste 😢";
  }
  gameEndedDiv.style.display = "block";
  gameEndedStatus.innerHTML = status;
  gameEndedMsg.innerHTML = `La palabra era <span>${secretWord.toLowerCase()}</span>. </br> 
  El juego finalizó con un total de ${guesses} intentos y ${score} puntos.`;
  gameEndedDiv.querySelector(".btn").addEventListener("click", newGame);
}

function updateScoreTries() {
  guessesUI.innerHTML = `INTENTOS: ${guesses}`;
  scoreUI.innerHTML = `PUNTOS: ${score}`;
  if (lostScore === 10) {
    endGame(false);
  }
}

function updateWord() {
  let updatedWord = "";
  for (let i = 0; i < secretWord.length; i++) {
    if (usedLetters.indexOf(secretWord[i]) === -1) {
      updatedWord += "_";
      gameOn = true;
    } else {
      updatedWord += secretWord[i];
    }
  }
  hangmanWord.innerHTML = updatedWord;
}

function updateHangman() {
  hangmanImage.src = `../img/${lostScore}.png`;
}

function disableLetter(e) {
  let clickedLetter = e.target.innerHTML;
  if (clickedLetter.id !== "used-letter") {
    clickedLetter.id = "used-letter";
    clickedLetter.disabled = true;
  }
}

function compareLetter(e) {
  gameOn = false;
  const letter = e.target.innerHTML;
  if (usedLetters.indexOf(letter) === -1) {
    usedLetters.push(letter);
  }
  disableLetter(e);
  if (secretWord.indexOf(letter) === -1) {
    lostScore += 1;
    updateHangman();
  } else {
    score += 5;
    updateWord();
    if (!gameOn) {
      endGame(true);
    }
  }
  guesses += 1;
  updateScoreTries();
}

function compareWord(e) {
  if (e.keyCode === 13 || e.type === "click") {
    const inputWord = wordInput.value.toUpperCase();
    if (inputWord === secretWord) {
      hangmanWord.innerHTML = secretWord;
      score += 20;
      endGame(true);
    } else {
      lostScore += 1;
      updateHangman();
    }
    wordInput.value = "";
    guesses += 1;
    updateScoreTries();
  }
}

function newGame() {
  location.reload();
}

// SELECTORS
const letterButton = document
  .querySelector("#keyboard")
  .querySelectorAll("button");
const wordButton = document
  .querySelector("#user-input")
  .querySelector("button");
const wordInput = document.querySelector("input");
const hangmanWord = document.querySelector("#hangman-word");
const hangmanImage = document.querySelector("#hangman-img");
const scoreUI = document.querySelector("#score");
const guessesUI = document.querySelector("#guesses");

// VARIABLES

const secretWord = selectWord();
let score = 0;
let guesses = 0;
let usedLetters = [];
let lostScore = 0;
let gameOn = false;

// MAIN

letterButton.forEach(function (button) {
  button.addEventListener("click", compareLetter);
});
wordButton.addEventListener("click", compareWord);
wordInput.addEventListener("keypress", compareWord);
document.addEventListener("DOMContentLoaded", updateWord);
