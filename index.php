<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="icon" href="img/icon4.ico" />
    <title>Ahorcado</title>
  </head>
  <body>
    <div id="game">
      <main id="blank">
        <div id="hangman-img"></div>
        <p id="hangman-word"></p>
        <p id="letter-amount"></p>
        <p id="score">PUNTOS: 0</p>
        <p id="guesses">INTENTOS: 0</p>
      </main>
      <div id="keyboard">
        <button data-text id="A">A</button>
        <button data-text id="B">B</button>
        <button data-text id="C">C</button>
        <button data-text id="D">D</button>
        <button data-text id="E">E</button>
        <button data-text id="F">F</button>
        <button data-text id="G">G</button>
        <button data-text id="H">H</button>
        <button data-text id="I">I</button>
        <button data-text id="J">J</button>
        <button data-text id="K">K</button>
        <button data-text id="L">L</button>
        <button data-text id="M">M</button>
        <button data-text id="N">N</button>
        <button data-text id="Ñ">Ñ</button>
        <button data-text id="O">O</button>
        <button data-text id="P">P</button>
        <button data-text id="Q">Q</button>
        <button data-text id="R">R</button>
        <button data-text id="S">S</button>
        <button data-text id="T">T</button>
        <button data-text id="U">U</button>
        <button data-text id="V">V</button>
        <button data-text id="W">W</button>
        <button data-text id="X">X</button>
        <button data-text id="Y">Y</button>
        <button data-text id="Z">Z</button>
      </div>
      <div id="user-input">
        <input type="text" placeholder="Escribí la palabra completa" />
        <button>✔</button>
      </div>
      <script src="js/index.js"></script>
    </div>
  </body>
</html>
