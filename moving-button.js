const button = document.getElementById("gameButton");
const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");
let score = 0;
let timeLeft = 0;

let timeInterval = null;
let autoMoveInterval = null;
let hitTimer = null;

// move button to random place
function moveButton() {
  const x = Math.random() * (window.innerWidth - 200);
  const y = Math.random() * (window.innerHeight - 200);
  button.style.left = x + "px";
  button.style.top = y + "px";
}

function startGame() {
  score = 0;
  timeLeft = 15; // shorter game
  scoreText.textContent = score;
  timeText.textContent = timeLeft;

  button.textContent = "Target";
  button.style.backgroundColor = "red";

  moveButton();
  button.disabled = false;
  moveDelay = 2000; // time between moves
  autoMoveInterval = setInterval(autoMove, moveDelay);
  timeInterval = setInterval(updateTimer, 1000);
}
button.textContent = "Start";
button.style.backgroundColor = "green";
button.disabled = false;

button.addEventListener("click", function startOrPlay() {
  if (button.textContent === "Start" || button.textContent === "Restart") {
    startGame();
  } else if (button.textContent === "Target") {
    handleHit();
  }
});
let moveDelay = 2000;
let canMove = true;

function updateTimer() {
  timeLeft-=1;
  timeText.textContent = timeLeft;
  if (timeLeft==0) {
    endGame();
  }
}

function handleHit() {
  moveButton();
  adjustSpeed(true); // speed up after hit
  score++;
  scoreText.textContent = score;
  clearInterval(autoMoveInterval);
  autoMoveInterval = setInterval(autoMove, moveDelay);
}

function adjustSpeed(faster) {
  if (faster) {
    moveDelay = moveDelay * 0.8; // 1/5 faster
  } else {
    moveDelay = moveDelay * 1.2; // 1/5 slower
  }
}

function autoMove() {
  if (canMove) {
    moveButton();
    adjustSpeed(false); // slow down when auto moves
    clearInterval(autoMoveInterval);
    autoMoveInterval = setInterval(autoMove, moveDelay);
  }
}

function endGame() {
  clearInterval(autoMoveInterval);
  clearInterval(timeInterval);
  button.textContent = "Restart";
  button.style.backgroundColor = "green";
  alert("Time’s up! You scored " + score + " points!");
  moveDelay = 2000;
}