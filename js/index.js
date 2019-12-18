// DOM ELEMENTS + EVENTS

document.addEventListener("DOMContentLoaded", letterGuess);

document
  .querySelector("#keyboard")
  .querySelectorAll("button")
  .forEach(function(button) {
    button.addEventListener("click", letterGuess);
  });

document
  .querySelector("#user-input")
  .querySelector("button")
  .addEventListener("click", wordGuess);

document.querySelector("input").addEventListener("keypress", wordGuess);

let hangmanImage = document.querySelector("#hangman-img");

let score = document.querySelector("#score");
let guesses = document.querySelector("#guesses");

// GUESSES + SCORE
let totalScore = 0;
let totalGuesses = 0;

function updateScore() {
  score.textContent = `PUNTOS: ${totalScore}`;
  guesses.textContent = `INTENTOS: ${totalGuesses}`;
}

// SELECT WORD FUNCTION

function secretWord() {
  const wordArray = ["BOLETO", "HAMACA", "PEPINO", "AVION", "PRINCIPIO", "ABOGADO", "CALZADO", "BEBIDA", "COMENTARIO", "SABIDURIA"];

  let secretWord = wordArray[Math.floor(Math.random() * wordArray.length)];

  return secretWord;
}

let gameWord = secretWord();

// LETTER GUESS FUNCTION

let usedLetters = [];

function letterGuess(event) {
  if (event.type === "click") {
    totalGuesses++;
    updateScore();
  }

  let letterInput = event.target.textContent;

  const redLetters = function() {
    let clickedLetter = event.target;

    usedLetters.push(clickedLetter.textContent);

    if (clickedLetter.id !== "used-letter") {
      clickedLetter.id = "used-letter";
      clickedLetter.disabled = true;
    }
  };

  redLetters();

  let gameWordCopy = gameWord.split("");

  function doesLetterMatch() {
    let puzzle = "";

    gameWordCopy.forEach(letter => {
      if (usedLetters.includes(letter)) {
        puzzle += letter;
      } else {
        puzzle += "_";
      }
    });
    return puzzle;
  }

  if (gameWord.includes(letterInput)) {
    totalScore = totalScore + 5;
    updateScore();
  } else if (!gameWord.includes(letterInput) && event.type === "click") {
    userLost();
  }

  let getPuzzle = doesLetterMatch();

  document.querySelector("#hangman-word").innerHTML = getPuzzle;

  if (getPuzzle === gameWord) {
    setTimeout(endGame, 500);
  }
}

// WORD GUESS FUNCTION

function wordGuess(e) {
  let emptyInput = document.querySelector("input");

  if (e.keyCode === 13 || event.which === 13 || event.type === "click") {
    let wordInput = emptyInput.value.toUpperCase();

    if (wordInput === "" || wordInput.length < 2) {
      console.log(event.keyCode);
      alert("Ingresar palabra completa");
    } else {
      totalGuesses++;
      updateScore();
    }

    const doesWordMatch = function() {
      if (wordInput === gameWord) {
        totalScore = totalScore + 50;
        updateScore();
        document.querySelector("#hangman-word").innerHTML = gameWord;
        setTimeout(endGame, 500);
      } else if (wordInput !== "") {
        userLost();
      }
    };
    doesWordMatch();
    emptyInput.value = "";
    emptyInput.focus();
  }
}

// FUNCTION WRONG GUESS

let loser = 0;

const userLost = function() {
  loser++;
  switch (loser) {
    case 1:
      hangmanImage.id = "hangman-head";
      break;
    case 2:
      hangmanImage.id = "hangman-body";
      break;
    case 3:
      hangmanImage.id = "hangman-right-leg";
      break;
    case 4:
      hangmanImage.id = "hangman-left-leg";
      break;
    case 5:
      hangmanImage.id = "hangman-right-arm";
      break;
    case 6:
      hangmanImage.id = "hangman-left-arm";
      break;
    case 7:
      hangmanImage.id = "hangman-right-eye";
      break;
    case 8:
      hangmanImage.id = "hangman-left-eye";
      break;
    case 9:
      hangmanImage.id = "hangman-mouth";
      break;
    case 10:
      hangmanImage.id = "hangman-dead";
      break;
  }

  if (loser === 10) {
    setTimeout(endGame, 500);
  }
};

function endGame() {
  let oldGame = document.querySelector("#game");

  let message = document.createElement("div");

  if (loser >= 10) {
    message.innerHTML = `<h1>Perdiste</h1>
    <img src="img/lose.gif" class="gif" />
    <p>La palabra era <span class="highlight">${gameWord.toLowerCase()}</span class="highlight">. <br>Tuviste ${totalGuesses} intentos y obtuviste ${totalScore} puntos.</p>`;
  } else {
    message.innerHTML = `<h1>Ganaste</h1>
    <img src="img/win.gif" class="gif" />
    <p>Adivinaste la palabra <span class="highlight">${gameWord.toLowerCase()}</span class="highlight"> en ${totalGuesses} intentos. <br>
    Obtuviste un total de ${totalScore} puntos.</p>`;
  }

  message.className = "modal";

  oldGame.parentNode.replaceChild(message, oldGame);

  const btn = document.createElement("div");

  btn.innerHTML = "JUGAR OTRA VEZ";

  btn.className = "btn";

  message.appendChild(btn);

  loadModal();
}

function loadModal() {
  document.querySelector(".btn").addEventListener("click", newGame);
}

function newGame() {
  location.reload(true);
}
