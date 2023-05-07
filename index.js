let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");
let startNewGameButton = document.getElementById("startNewGame");
let pauseGameButton = document.getElementById("pauseGame");
let squares = document.querySelectorAll(".square");
let grid = document.getElementsByClassName("grid")[0];
let gameOver = document.getElementById("title");

let score = 0;
let timeLeft = 20;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;
let gameMusic = new Audio("./music.mp3");
let hitSound = new Audio("./hit.wav");
let gameOverMusic = new Audio("go.wav");

function randomMole() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}

randomMole();

function countDown() {
  timeLeft--;
  timeLeftH2.innerText = `Time Left : ${timeLeft}`;
  if (timeLeft === 0) {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    gameMusic.pause();
    grid.style.display = "none";
    timeLeftH2.style.display = "none";
    pauseGameButton.style.display = "none";
    gameOver.innerText = `Game Over!!`;
    setTimeout(gameOverMusic.play(), 3000);
    startNewGameButton.style.display = "inline-block";
  }
}

function startGame() {
  score = 0;
  timeLeft = 20;
  timeLeftH2.style.display = "inline-block";
  scoreH2.innerHTML = "Your Score : 0";
  timeLeftH2.innerHTML = `Time Left : ${timeLeft}`;
  grid.style.display = "flex";
  pauseGameButton.style.display = "inline-block";
  pauseGameButton.innerHTML = "Pause";
  gameMusic.play();
  timerId = setInterval(randomMole, 1000);
  randomMoleId = setInterval(countDown, 1000);
  startNewGameButton.style.display = "none";
}

function pauseResumeGame() {
  if (pauseGameButton.textContent === "Pause") {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    timerId = null;
    randomMoleId = null;
    gameMusic.pause();
    pauseGameButton.textContent = "Resume";
  } else {
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
    pauseGameButton.textContent = "Pause";
    gameMusic.play();
  }
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (timerId !== null) {
      if (square.id === hitPosition) {
        hitSound.play();
        setTimeout(() => {
          hitSound.pause();
        }, 700);
        score++;
        scoreH2.innerText = `Your Score : ${score}`;
        hitPosition = null;
      }
    }
  });
});

startNewGameButton.addEventListener("click", startGame);
pauseGameButton.addEventListener("click", pauseResumeGame);
